import fetch from 'node-fetch'
import {
	defaultAbiCoder,
	FormatTypes,
	Fragment,
	JsonFragment,
	type Result
} from '@ethersproject/abi'
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'
import { type BytesLike, hexlify } from '@ethersproject/bytes'
import { addHexPrefix } from './utils'

export function splitCallData(calldata: BytesLike): [string, string] {
	const cd = typeof calldata === 'string' ? addHexPrefix(calldata) : hexlify(calldata)

	return [cd.substring(0, 10), `0x${cd.substring(10)}`]
}

export function decodeInputs(
	abiFragment: string | Fragment | JsonFragment,
	data: BytesLike,
	loose?: boolean
): Result {
	const fragment = abiFragment instanceof Fragment ? abiFragment : Fragment.from(abiFragment)

	return defaultAbiCoder.decode(fragment.inputs, data, loose)
}

export function getMethodId(sighash: string): string {
	return keccak256(toUtf8Bytes(sighash)).substring(0, 10)
}

export function getSighash(abiFragment: string | Fragment | JsonFragment): string {
	const fragment = abiFragment instanceof Fragment ? abiFragment : Fragment.from(abiFragment)

	return fragment.format(FormatTypes.sighash)
}

export function findMethodById(methodId: BytesLike, abi: JsonFragment[]): JsonFragment | undefined {
	const mId = typeof methodId === 'string' ? addHexPrefix(methodId) : hexlify(methodId)
	return abi.filter((a) => a.type === 'function').find((a) => getMethodId(getSighash(a)) === mId)
}

export function decodeCallData(calldata: BytesLike, abi: JsonFragment[], loose?: boolean) {
	const [methodId, params] = splitCallData(calldata)

	const method = findMethodById(methodId, abi)
	if (!method) throw new Error('Could not find method for given data')
	const inputs = decodeInputs(method, params, loose)
	return {
		method: Fragment.from(method),
		inputs
	}
}

interface EthdbResult {
	bytes_signature: string
	created_at: string
	hex_signature: string
	id: number
	text_signature: string
}

interface EthdbResponse {
	count: number
	next: null
	previous: null
	results: EthdbResult[]
}

export async function retrieveMethodFromDB(sighash: BytesLike): Promise<string | undefined> {
	const sh = typeof sighash === 'string' ? addHexPrefix(sighash) : hexlify(sighash)

	const response = await fetch(
		`https://www.4byte.directory/api/v1/signatures/?hex_signature=${sh}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		}
	)

	if (!response.ok) {
		throw new Error(`Error! status: ${response.status}`)
	}

	const result = (await response.json()) as EthdbResponse

	console.log('result is: ', JSON.stringify(result, null, 4))

	if (result.results[0]) return result.results[0].text_signature
}

export default decodeCallData
