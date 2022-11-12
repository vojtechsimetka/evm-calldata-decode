import decodeCallData, { decodeInputs, findMethodById, getMethodId, getSighash } from '../src/index'
import { BigNumber } from '@ethersproject/bignumber'
import abi2 from './abi2.json'

describe('getMethodId', () => {
	const testValues = [{ input: 'mint(uint256,uint256)', output: '0x1b2ef1ca' }]

	testValues.forEach((tv) =>
		test(`should return ${tv.output} for ${tv.input}`, () => {
			expect(getMethodId(tv.input)).toEqual(tv.output)
		})
	)
})

describe('getSighash', () => {
	const testValues = [
		{
			input: {
				constant: false,
				inputs: [
					{
						name: '_amount',
						type: 'uint256'
					},
					{
						name: '_maxCollateralSpend',
						type: 'uint256'
					}
				],
				name: 'mint',
				outputs: [
					{
						name: 'success',
						type: 'bool'
					}
				],
				payable: false,
				stateMutability: 'nonpayable',
				type: 'function'
			},
			output: 'mint(uint256,uint256)'
		}
	]

	testValues.forEach((tv) =>
		test(`should return ${tv.output}`, () => {
			expect(getSighash(tv.input)).toEqual(tv.output)
		})
	)
})

describe('decodeInputs', () => {
	test('should decode two uint256 address params', () => {
		const fragmentJson = {
			constant: false,
			inputs: [
				{
					name: '_amount',
					type: 'uint256'
				},
				{
					name: '_maxCollateralSpend',
					type: 'uint256'
				}
			],
			name: 'mint',
			outputs: [
				{
					name: 'success',
					type: 'bool'
				}
			],
			payable: false,
			stateMutability: 'nonpayable',
			type: 'function'
		}

		const callData =
			'0x0000000000000000000000000000000000000000000000070c1cc73b00c800000000000000000000000000000000000000000000000001567fdd05cd25f80000'

		const res = decodeInputs(fragmentJson, callData)

		expect(res[0]).toBeInstanceOf(BigNumber)
		expect((res[0] as BigNumber).toString()).toEqual('130000000000000000000')
		expect(res[1]).toBeInstanceOf(BigNumber)
		expect((res[1] as BigNumber).toString()).toEqual('6318000000000000000000')
	})
})

describe('findMethodById', () => {
	test('should find method in abi', () => {
		const res = findMethodById('0x1b2ef1ca', abi2)

		expect(res).toBeDefined()
		expect(res?.name).toEqual('mint')
	})
	test('should not find method in abi', () => {
		const res = findMethodById('0x00000000', abi2)

		expect(res).toBeUndefined()
	})
})

describe('decodeCalldata', () => {
	test('should decode call data', () => {
		const res = decodeCallData('0x1b2ef1ca0000000000000000000000000000000000000000000000070c1cc73b00c800000000000000000000000000000000000000000000000001567fdd05cd25f80000', abi2)

		expect(res.method.name).toEqual('mint')
	})
})
