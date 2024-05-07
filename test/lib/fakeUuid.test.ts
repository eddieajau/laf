/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { fakeUuid } from '../../src'

describe('lib/fakeUuid', () => {
  it('should create a fake uuid', () => {
    expect(fakeUuid(1, 2)).toEqual('000000ff-0000-4000-8002-000000000001')
  })
})
