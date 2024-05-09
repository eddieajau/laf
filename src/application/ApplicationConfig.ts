/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { existsOrThrow } from '../validation'

/**
 * Expects the following configuration.
 * - BUILD_NUMBER
 * - LOG_LEVEL - Default: 'info'.
 * @example
 * ```typescript
 * // Assuming this file is in `/src`.
 * import { version } from '../package.json'
 *
 * const config = new ApplicationConfig({ ...process.env, version })
 * ```
 */
export class ApplicationConfig {
  public build?: string

  public version: string

  constructor({ BUILD_NUMBER, version }: { [key: string]: string | undefined }) {
    this.build = BUILD_NUMBER
    this.version = existsOrThrow(version, 'version')
  }
}
