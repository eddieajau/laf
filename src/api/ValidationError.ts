/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import HttpErrors from 'http-errors'

/**
 * A custom error class to handle validation errors.
 *
 * In this case the request is correctly formed, but the entity submitted in not processable.
 * Therefore, the server will return a 422 status code.
 */
export class ValidationError extends HttpErrors.UnprocessableEntity {
  constructor(public errors: string[], message?: string) {
    super(message)
  }
}
