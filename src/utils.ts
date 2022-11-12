/**
 * Strips prefix from a string
 *
 * @param s string input
 */
export function addHexPrefix(s: string): string {
	if (typeof s === 'string' && /^[0-9a-f]+$/i.test(s)) return `0x${s}`

	return s
}
