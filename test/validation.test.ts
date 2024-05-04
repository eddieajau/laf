/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { existsOrThrow } from '../src'

describe('validation', () => {
  describe('existsOrThrow', () => {
    it('should return the value if it exists', () => {
      expect(existsOrThrow('value', 'name')).toBe('value')
    })

    it('should throw an error if the value does not exist', () => {
      expect(() => existsOrThrow(undefined, 'name')).toThrow('Missing: name')
    })
  })
})
