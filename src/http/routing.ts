/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { NextFunction, Request, Response } from 'express'

export type RouteHandler<T, Req = Request> = (req: Req, res: Response) => Promise<T>

/**
 * Creates a light async/promise handler for an Express route.
 */
export const asyncHandler = <T, Req = Request>(handler: RouteHandler<T, Req>) => {
  return (req: Req, res: Response, next: NextFunction) =>
    handler(req, res)
      .then((resp) => res.json(resp))
      .catch(next)
}
