/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 * @note      2024-05-06 Jest has trouble destructuring some non-type exports.
 */

import { NextFunction, Request, Response } from 'express'
import HttpErrors, { HttpError } from 'http-errors'

export function handleNotFound(req: Request, res: Response, next: NextFunction): void {
  next(new HttpErrors.NotFound())
}

export function handleError(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(error)
  }

  /* @ts-expect-error err */
  res.err = error
  res.status('status' in error ? error.status : undefined || 500)
  res.send(error)
}
