/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 * @note      2024-05-06 Jest has trouble destructuring some non-type exports.
 */

import { NextFunction, Request, Response } from 'express'
import Errors from 'http-errors'
import { JwtPayload } from 'jsonwebtoken'
import { TokenService } from './TokenService'

export interface IUser {
  id?: string
}

export interface IUserSession {
  user?: IUser
}

export function handleAuth(tokens: TokenService) {
  return (req: Request & IUserSession, res: Response, next: NextFunction): void => {
    req.user = undefined

    if (typeof req?.headers?.authorization !== 'string') {
      return next()
    }

    const [type, credentials] = req.headers.authorization!.split(/[ ]+/)

    if (type.toLowerCase() !== 'bearer') {
      return next()
    }

    try {
      const decoded = tokens.verify(credentials) as JwtPayload

      if (decoded.sub) {
        req.user = {
          id: decoded.sub,
        }
      }

      next()
    } catch (e) {
      // Ignore any token decoding problems
      next()
    }
  }
}

/**
 * Guard a route to enforce an authenticated user.
 */
export function userAuthenticated() {
  return (req: Request & IUserSession, res: Response, next: NextFunction): void => {
    next(req.user ? undefined : new Errors.Forbidden())
  }
}
