/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { existsOrThrow } from '../validation'

export class ApplicationConfig {
  public build?: string

  public logLevel: string

  public version: string

  constructor({ BUILD_NUMBER, LOG_LEVEL, version }: { [key: string]: string | undefined }) {
    this.build = BUILD_NUMBER
    this.logLevel = LOG_LEVEL || 'info'
    this.version = existsOrThrow(version, 'version')
  }
}
