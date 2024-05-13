/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response, Router } from 'express'
import http from 'http'
import { createHttpTerminator, HttpTerminator } from 'http-terminator'
import { ApplicationConfig } from '../application/ApplicationConfig'
import { Module } from '../application/Module'
import { ILogger, LOGGER } from '../application/Logger'
import { handleAuth } from './auth'
import { handleNotFound, handleError } from './errors'
import { HttpModuleConfig } from './HttpModuleConfig'
// import { logging } from './logging'
import { TokenService } from './TokenService'
import { TokenServiceConfig } from './TokenServiceConfig'
import { Container } from 'inversify'

const MIDDLEWARE = Symbol('express-middleware')
const app = express()
const router = express.Router()
let httpServer: http.Server

/**
 * A module to wire up an Express HTTP server.
 *
 * @example
 * ```typescript
 * import { HttpModule } from '@eddieajau/laf'
 * import { Request, Response, NextFunction } from 'express'
 *
 * export class MyModule extends Module {
 *   public register(): void {
 *     HttpModule.addMiddleware(this.container, (req: Request, res: Response, next: NextFunction) => {
 *      // Your middleware logic here.
 *      next()
 *    })
 *   }
 * }
 */
export class HttpModule extends Module {
  /**
   * Expose the Express Router class for better clarity.
   *
   * @example
   * ```typescript
   * import { HttpModule } from '@eddieajau/laf'
   *
   * export class MyModule extends Module {
   *   public start(): void {
   *     const router = this.container.get(HttpModule.Router)
   *     // ...
   *   }
   * }
   */
  public static Router = Router

  /**
   * A helper method to add middleware to the Express server.
   *
   * @example
   * ```typescript
   * import { HttpModule } from '@eddieajau/laf'
   * import { Request, Response, NextFunction } from 'express'
   *
   * export class MyModule extends Module {
   *   public register(): void {
   *     HttpModule.addMiddleware(this.container, (req: Request, res: Response, next: NextFunction) => {
   *      // Your middleware logic here.
   *      next()
   *    })
   *   }
   * }
   */
  public static addMiddleware(
    container: Container,
    middleware: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    container.bind(MIDDLEWARE).toConstantValue(middleware)
  }

  private terminator!: HttpTerminator

  public register(): void {
    this.container.bind(express.Router).toConstantValue(router)
    this.container.bind(HttpModuleConfig).toConstantValue(new HttpModuleConfig(process.env))
    this.container.bind(TokenService).toSelf()
    this.container.bind(TokenServiceConfig).toConstantValue(new TokenServiceConfig(process.env))
  }

  public async start(): Promise<void> {
    let startTime: number
    const httpOptions = this.container.get(HttpModuleConfig)
    const serverOptions = this.container.get(ApplicationConfig)
    const logger = this.container.get<ILogger>(LOGGER)
    const tokens = this.container.get(TokenService)
    const port = httpOptions.port

    // app.use(logging(logger))
    if (this.container.isBound(MIDDLEWARE)) {
      this.container
        .getAll<(req: Request, res: Response, next: NextFunction) => void>(MIDDLEWARE)
        .forEach((middleware) => app.use(middleware))
    }
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(handleAuth(tokens))
    logger.debug(`Auth ...${httpOptions.tokenSecret.slice(httpOptions.tokenSecret.length - 3)}`)

    router.get('/', (req: Request, res: Response) => {
      res.json({
        build: serverOptions.build,
        uptime: +((Date.now() - startTime) / 1000).toFixed(3),
        version: serverOptions.version,
      })
    })

    // Mount the routers
    app.use(router)

    // Error handlers
    app.use(handleNotFound)
    app.use(handleError)

    // app.use(error())
    app.set('port', port)

    // Create HTTP server.
    httpServer = http.createServer(app)

    this.terminator = createHttpTerminator({
      server: httpServer,
    })

    return new Promise((resolve) => {
      // Listen on provided port, on all network interfaces.
      httpServer.listen(port, () => {
        const addr = httpServer.address()
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port

        startTime = Date.now()
        logger.info('HTTP listening on ' + bind)
        resolve()
      })
    })
  }

  public async stop(): Promise<void> {
    return this.terminator.terminate()
  }
}
