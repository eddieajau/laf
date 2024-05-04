/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { jest } from '@jest/globals'
import { Container } from 'inversify'
import { LOGGER, Module, Application as Application, ApplicationConfig, Logger } from '../../src'

class TestModule extends Module {
  public register(): void {
    this.container.get<Logger>(LOGGER).info('registered')
  }

  public async start(): Promise<void> {
    this.container.get<Logger>(LOGGER).info('started')
  }

  public async stop(): Promise<void> {
    this.container.get<Logger>(LOGGER).info('stopped')
  }
}

describe('application/Application', () => {
  let instance: Application
  let logger: Logger

  beforeEach(() => {
    const env = new ApplicationConfig({ version: '1.0.0' })

    logger = {} as Logger
    logger.info = jest.fn()
    logger.trace = jest.fn()

    instance = new Application(env, logger)
    instance.addModules([TestModule])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('contructor', () => {
    it('should create a default logger if not supplied', () => {
      const app = new Application(new ApplicationConfig({ version: '1.0.0' }))

      const result = app.getContainer().get<Logger>(LOGGER)
      // todo assert that the logger is a pino logger
      expect(result).not.toBeUndefined()
    })

    it('should bind a custom logger if supplied', () => {
      const logger = {} as Logger
      const app = new Application(new ApplicationConfig({ version: '1.0.0' }), logger)

      expect(app.getContainer().get(LOGGER)).toBe(logger)
    })

    it('should bind the ApplicationConfig to the container', () => {
      expect(instance.getContainer().get(ApplicationConfig)).toBeInstanceOf(ApplicationConfig)
    })
  })

  describe('getContainer', () => {
    it('should let me get the container', () => {
      expect(instance.getContainer()).toBeInstanceOf(Container)
    })
  })

  describe('register', () => {
    it('should register a module', async () => {
      const chained = instance.register()

      expect(chained).toBe(instance)
      expect(logger.info).toHaveBeenCalledWith('registered')
    })
  })

  describe('start', () => {
    it('should start a module', async () => {
      await instance.start()

      expect(logger.info).toHaveBeenCalledWith('started')
    })
  })

  describe('stop', () => {
    it('should stop a module', async () => {
      await instance.stop()

      expect(logger.info).toHaveBeenCalledWith('stopped')
    })
  })
})
