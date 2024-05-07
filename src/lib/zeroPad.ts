/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

/**
 * A helper to convert a number into a string with a fixed length and prefixed with zeros.
 *
 * @example
 * ```ts
 * const padded = zeroPad(1, 4) // '0001'
 * ```
 */
export const zeroPad = (n: number, length: number) => String(n).padStart(length, '0')
