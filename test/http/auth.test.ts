/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 * @note      2024-05-06 Jest has trouble destructuring some non-type exports.
 */
/* eslint-disable jest/no-done-callback */

import { Request, RequestHandler, Response } from 'express'
import Jwt from 'jsonwebtoken'
import { TokenService } from '../../src'
import { handleAuth, IUserSession, userAuthenticated } from '../../src/http/auth'

describe('http/auth', () => {
  let req: Request & IUserSession
  let res: Response
  const secret = 'guess'

  describe('handleAuth', () => {
    let middleware: RequestHandler
    const tokens = new TokenService({ secret })

    beforeEach(() => {
      middleware = handleAuth(tokens)

      req = {} as Request & IUserSession
      res = {} as Response
    })

    it('should set the user id in the session', (done) => {
      const payload = { sub: 'abc', country_code: 'NZ' }
      const token = Jwt.sign(payload, secret)

      req.headers = { authorization: `bearer ${token}` }

      middleware(req, res, () => {
        try {
          expect(req.user).toEqual({ id: payload.sub })
          done()
        } catch (e) {
          done(e)
        }
      })
    })

    it('should ignore the authorisiation header if it is missing', (done) => {
      middleware(req, res, () => {
        try {
          expect(req.user).toBeUndefined()
          done()
        } catch (e) {
          done(e)
        }
      })
    })

    it('should ignore the authorisiation header if it is not a string', (done) => {
      // @ts-expect-error: deliberating forcing the authorization value to be a non-string
      req.headers = { authorization: true }

      middleware(req, res, () => {
        try {
          expect(req.user).toBeUndefined()
          done()
        } catch (e) {
          done(e)
        }
      })
    })

    it('should ignore the authorisiation header if it is not of type "bearer"', (done) => {
      req.headers = { authorization: 'unexpected type' }

      middleware(req, res, () => {
        try {
          expect(req.user).toBeUndefined()
          done()
        } catch (e) {
          done(e)
        }
      })
    })

    it('should ignore an invalid bearer token', (done) => {
      req.headers = { authorization: 'Bearer invalid' }

      middleware(req, res, () => {
        try {
          expect(req.user).toBeUndefined()
          done()
        } catch (e) {
          done(e)
        }
      })
    })

    it('should ignore a bearer token without a sub', (done) => {
      const token = Jwt.sign({}, secret)

      req.headers = { authorization: `bearer ${token}` }

      middleware(req, res, () => {
        try {
          expect(req.user).toBeUndefined()
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })

  describe('userAuthenticated', () => {
    let middleware: RequestHandler

    beforeEach(() => {
      middleware = userAuthenticated()

      res = {} as Response
    })

    it('should not throw if the request has a user', (done) => {
      req = { user: { id: 'the-id' } } as Request & IUserSession

      middleware(req, res, (e) => {
        try {
          expect(e).toBeUndefined()
          done()
        } catch (e) {
          done(e)
        }
      })
    })

    it('should throw if the user is undefined in the requesst', (done) => {
      req = { user: undefined } as Request & IUserSession

      middleware(req, res, (e) => {
        try {
          expect(e.message).toBe('Forbidden')
          expect(e.status).toBe(403)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
