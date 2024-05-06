/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 * @note      2024-05-04 Jest has trouble destructuring some non-type exports.
 */

import Jwt from 'jsonwebtoken'
import { TokenService, TokenServiceConfig } from '../../src'

describe('http/TokenService', () => {
  let config: TokenServiceConfig
  let instance: TokenService

  beforeEach(() => {
    config = new TokenServiceConfig({ HTTP_JWT_SECRET: 'secret', HTTP_JWT_ISSUER: 'issuer' })
    instance = new TokenService(config)
  })

  describe('verify', () => {
    it('should verify a signed token', () => {
      const payload = { foo: 'bar' }
      const token = Jwt.sign(payload, config.secret, { issuer: config.issuer })
      const result = instance.verify(token) as Jwt.JwtPayload

      expect(result.foo).toBe(payload.foo)
    })
  })

  describe('sign', () => {
    it('should sign a token', () => {
      const data = { foo: 'bar' }
      const opts = { audience: 'the-audience' }
      const token = instance.sign(data, opts)

      const { payload } = Jwt.verify(token, config.secret, { complete: true }) as Jwt.JwtPayload

      expect(payload.foo).toBe(payload.foo)
      expect(payload.aud).toBe(opts.audience)
      expect(payload.iss).toBe(config.issuer)
    })

    it('should salt a token', () => {
      const salt = 'pepper'
      const token = instance.sign({}, {}, salt)

      instance.verify(token, {}, salt)

      expect(() => instance.verify(token, {})).toThrow()
    })
  })
})
