/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { Container } from 'inversify'
import { Module } from './Module'
import { ApplicationConfig } from './ApplicationConfig'
import { LOGGER, Logger, NullLogger } from './Logger'

/**
 * Provides the basic scaffolding for a modular Node.js server.
 *
 * Includes the logger and dependency injection container.
 * Allows other functionality to be provided by modules with the following lifecyle events:
 * - register: register services with the DI container
 * - start: start services
 * - stop: stop services
 */
export class Application {
  /**
   * The logger.
   */
  public logger: Logger

  /**
   * The dependency injection container.
   */
  private container = new Container({
    defaultScope: 'Singleton',
  })

  /**
   * The server modules.
   */
  private modules = [] as Module[]

  constructor(config: ApplicationConfig, logger?: Logger) {
    this.logger = logger ?? new NullLogger()
    this.container.bind(ApplicationConfig).toConstantValue(config)
    this.container.bind(LOGGER).toConstantValue(this.logger)
  }

  /**
   * Get the instance of the dependency injection container.
   */
  public getContainer(): Container {
    return this.container
  }

  /**
   * Add an array of modules to the server.
   */
  public addModules(modules: (typeof Module)[]): this {
    modules.forEach((module) => this.addModule(module))

    return this
  }

  /**
   * Call the register method on each module.
   */
  public register(): this {
    this.modules.forEach((module) => {
      this.logger.debug(`Application:register ${module.constructor.name}`)
      module.register()
    })

    return this
  }

  /**
   * Call the start method on each module.
   */
  public async start(): Promise<void> {
    for (const module of this.modules) {
      this.logger.debug(`Application:start    ${module.constructor.name}`)
      await module.start()
    }
  }

  /**
   * Call the stop method on each module.
   */
  public async stop(): Promise<void> {
    for (const module of this.modules) {
      this.logger.debug(`Application:stop     ${module.constructor.name}`)
      await module.stop()
      this.logger.debug(`Application:stopped  ${module.constructor.name}`)
    }
  }

  private addModule(module: typeof Module) {
    this.modules.push(new module(this.container))
  }
}
