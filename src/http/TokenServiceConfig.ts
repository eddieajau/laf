/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { injectable } from 'inversify'
import { existsOrThrow } from '../validation'
import { StringDictionary } from '../types'

@injectable()
/**
 * Configuration for the TokenService.
 *
 * @example
 * ```typescript
 * const config = new TokenServiceConfig(process.env)
 * ```
 */
export class TokenServiceConfig {
  /**
   * The secret used to sign and verify tokens.
   */
  public secret: string

  /**
   * An optional issuer to include in the token.
   */
  public issuer?: string

  constructor({ HTTP_JWT_ISSUER, HTTP_JWT_SECRET }: StringDictionary) {
    this.issuer = HTTP_JWT_ISSUER
    this.secret = existsOrThrow(HTTP_JWT_SECRET, 'HTTP_JWT_ISSUER')
  }
}
