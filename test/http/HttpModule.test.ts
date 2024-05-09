/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { Application, ApplicationConfig, HttpModule, NullLogger, ScalarDictionary } from '../../src'
import { NextFunction, Request, Response, Router } from 'express'
// import pino from 'pino'

const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Test', 'true')
  next()
}

describe('http/HttpModule', () => {
  let application: Application

  beforeAll(async () => {
    process.env.HTTP_JWT_SECRET = 'secret'
    process.env.HTTP_JWT_ISSUR = 'com.example'

    const config = new ApplicationConfig({ ...process.env, version: '1.0.0' })
    // const logger = pino({ level: 'error' })
    const logger = new NullLogger()

    application = new Application(config, logger).addModules([HttpModule]).register()

    HttpModule.addMiddleware(application.getContainer(), myMiddleware)

    await application.start()
  })

  afterAll(async () => {
    await application.stop()
  })

  it('should expose the Router class', () => {
    expect(HttpModule.Router).toBe(Router)
  })

  it('should have added the middleware', async () => {
    const resp = await fetch('http://localhost:3000')

    expect(resp.headers.get('X-Test')).toEqual('true')
  })

  it('should return version and uptime', async () => {
    const resp = await fetch('http://localhost:3000')

    const { version, uptime } = (await resp.json()) as ScalarDictionary

    expect(version).toBe('1.0.0')
    expect(uptime).toBeGreaterThan(0)
  })

  it('should throw 404', async () => {
    const resp = await fetch('http://localhost:3000/not-found')

    const { message } = JSON.parse(await resp.text()) as ScalarDictionary

    expect(resp.ok).toBe(false)
    expect(resp.status).toBe(404)
    expect(message).toBe('Not Found')
  })
})
