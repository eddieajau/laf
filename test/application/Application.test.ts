/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { jest } from '@jest/globals'
import { Container } from 'inversify'
import { LOGGER, Module, Application as Application, ApplicationConfig, ILogger } from '../../src'

class TestModule extends Module {
  public register(): void {
    this.container.get<ILogger>(LOGGER).info('registered')
  }

  public async start(): Promise<void> {
    this.container.get<ILogger>(LOGGER).info('started')
  }

  public async stop(): Promise<void> {
    this.container.get<ILogger>(LOGGER).info('stopped')
  }
}

describe('application/Application', () => {
  let instance: Application
  let logger: ILogger

  beforeEach(() => {
    const env = new ApplicationConfig({ version: '1.0.0' })

    logger = {} as ILogger
    logger.info = jest.fn()
    logger.debug = jest.fn()

    instance = new Application(env, logger)
    instance.addModules([TestModule])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('contructor', () => {
    it('should create a default logger if not supplied', () => {
      const app = new Application(new ApplicationConfig({ version: '1.0.0' }))

      const result = app.getContainer().get<ILogger>(LOGGER)
      // todo assert that the logger is a pino logger
      expect(result).not.toBeUndefined()
    })

    it('should bind a custom logger if supplied', () => {
      const logger = {} as ILogger
      const app = new Application(new ApplicationConfig({ version: '1.0.0' }), logger)

      expect(app.getContainer().get(LOGGER)).toBe(logger)
    })

    it('should bind the ApplicationConfig to the container', () => {
      expect(instance.getContainer().get(ApplicationConfig)).toBeInstanceOf(ApplicationConfig)
    })

    it('should bind the environment vars to the container', () => {
      const env = instance.getContainer().get<NodeJS.ProcessEnv>(Application.ENV)

      expect(env.npm_package_name).toEqual('@eddieajau/laf')
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
