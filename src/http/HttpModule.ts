/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import http from 'http'
import { createHttpTerminator, HttpTerminator } from 'http-terminator'
import { ApplicationConfig } from '../application/ApplicationConfig'
import { Module } from '../application/Module'
import { Logger, LOGGER } from '../application/Application'
import { handleAuth } from './auth'
import { handleNotFound, handleError } from './errors'
import { HttpModuleConfig } from './HttpModuleConfig'
import { logging } from './logging'
import { TokenService } from './TokenService'
import { TokenServiceConfig } from './TokenServiceConfig'

const app = express()
const router = express.Router()
let httpServer: http.Server

export class HttpModule extends Module {
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
    const logger = this.container.get<Logger>(LOGGER)
    const tokens = this.container.get(TokenService)
    const port = httpOptions.port

    app.use(logging(logger))
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
