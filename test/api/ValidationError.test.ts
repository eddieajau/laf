/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import HttpErrors from 'http-errors'
import { ValidationError } from '../../src/api/ValidationError'

describe('ValidationError', () => {
  it('should extend UnprocessibleEntity', () => {
    const instance = new ValidationError(['error'])

    expect(instance).toBeInstanceOf(HttpErrors.UnprocessableEntity)
    expect(instance.message).toEqual('Unprocessable Entity')
    expect(instance.errors).toEqual(['error'])
  })

  it('should accept a custom message', () => {
    const instance = new ValidationError([], 'Custom message')

    expect(instance).toBeInstanceOf(HttpErrors.UnprocessableEntity)
    expect(instance.message).toEqual('Custom message')
  })
})
