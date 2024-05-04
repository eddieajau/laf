/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

/**
 * A function to validate that a value exists, or throw an error.
 *
 * @param value The value to test.
 * @param name The name of the value to include in the error message.
 * @returns the `value` passed to the function.
 * @example
 * ```ts
 * existsOrThrow('value', 'name') // returns 'value'
 * existsOrThrow(undefined, 'name') // throws an error 'Missing: name'
 * ```
 */
export function existsOrThrow(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing: ${name}`)
  }

  return value
}
