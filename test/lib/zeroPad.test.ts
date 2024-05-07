/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { zeroPad } from '../../src'

describe('lib/zeroPad', () => {
  it('should pad a string with zeros', () => {
    expect(zeroPad(1, 4)).toEqual('0001')
  })
})
