/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { paginate, toSkipTake } from '../src'

describe('pagination', () => {
  describe('paginate', () => {
    it('should use defaults', () => {
      expect(paginate({})).toEqual({ page: 1, limit: 10 }) // should use defaults
    })

    it('should use extreme limits', () => {
      expect(paginate({ page: 0, limit: 101 })).toEqual({ page: 1, limit: 100 })
    })

    it('should set the page and limit', () => {
      expect(paginate({ page: 2, limit: 4 })).toEqual({ page: 2, limit: 4 })
    })

    it('should allow zero limit', () => {
      expect(paginate({ limit: 0 })).toEqual({ page: 1, limit: 0 })
    })
  })

  describe('toSkipTake', () => {
    it('should work', () => {
      expect(toSkipTake({ page: 1, limit: 10 })).toEqual({ skip: 0, take: 10 }) // should use defaults
    })
  })
})
