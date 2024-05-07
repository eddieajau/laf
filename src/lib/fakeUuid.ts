/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { zeroPad } from './zeroPad'

/**
 * A helper function to create a fake but predictable UUIDv4.
 *
 * @example
 * ```ts
 * const id = fakeUuid(1, 2) // '000000ff-0000-4000-8002-000000000001'
 * ```
 */
export const fakeUuid = (node = 0, variant?: number) =>
  `000000ff-0000-4000-8${zeroPad(variant || 0, 3)}-${zeroPad(node, 12)}`
