/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { existsOrThrow } from '../validation'

/**
 * Expects the following configuration.
 * - HTTP_JWT_ISSUER
 * - HTTP_JWT_SECRET: Required.
 * - HTTP_PORT: Default '3000'.
 * @example
 * ```typescript
 * const config = new HttpModuleConfig(process.env)
 * ```
 */
export class HttpModuleConfig {
  public port: string

  public tokenIssuer?: string

  public tokenSecret: string

  constructor({ HTTP_JWT_ISSUER, HTTP_JWT_SECRET, HTTP_PORT }: { [key: string]: string } | NodeJS.ProcessEnv) {
    this.port = HTTP_PORT || '3000'
    this.tokenIssuer = HTTP_JWT_ISSUER
    this.tokenSecret = existsOrThrow(HTTP_JWT_SECRET, 'HTTP_JWT_SECRET')
  }
}
