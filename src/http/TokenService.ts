/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 * @note      2024-05-04 Jest has trouble destructuring some non-type exports.
 */

import { injectable } from 'inversify'
import Jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import { TokenServiceConfig } from './TokenServiceConfig'

@injectable()
export class TokenService {
  constructor(private options: TokenServiceConfig) {}

  public verify(token: string, options?: VerifyOptions, salt = '') {
    const opts = { ...options }

    if (this.options.issuer) {
      opts.issuer = this.options.issuer
    }

    return Jwt.verify(token, `${this.options.secret}${salt}`, opts)
  }

  public sign(payload: string | object | Buffer, options: SignOptions, salt = '') {
    const opts = { ...options }

    if (this.options.issuer) {
      opts.issuer = this.options.issuer
    }

    return Jwt.sign(payload, `${this.options.secret}${salt}`, opts)
  }
}
