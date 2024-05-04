/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { Container } from 'inversify'

/**
 * This class provides the basic scaffolding for a modular Node.js server.
 *
 * The instance of the module is instantiated by the Application with the DI container.
 */
export class Module {
  constructor(protected container: Container) {}

  /**
   * This method is called when the application's `register` method is called.
   *
   * It can be implemented to wire up dependencies in the DI container.
   * Note that this method is syncronous (thus, blocking).
   * Do not perform any async operations in this method.
   */
  public register(): void {}

  /**
   * This method is called when the application's `start` method is called.
   */
  public async start(): Promise<void> {}

  /**
   * This method is called when the application's `stop` method is called.
   */
  public async stop(): Promise<void> {}
}
