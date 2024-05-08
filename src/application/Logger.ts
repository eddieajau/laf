/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

export const LOGGER = Symbol('logger')

/**
 * An interface that should work agnostically with most loggers.
 */
export interface Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(...args: any[]): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(...args: any[]): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(...args: any[]): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(...args: any[]): void
}

/**
 * A logger with no side-effects.
 */
export class NullLogger implements Logger {
  debug(): void {}

  error(): void {}

  info(): void {}

  warn(): void {}
}
