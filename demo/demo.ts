/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */
/* eslint-disable no-console */

import 'reflect-metadata'
import dotenv from 'dotenv'
import pino from 'pino'
import { Application, ApplicationConfig, HttpModule } from '../src'
import { version } from '../package.json'
import { ThingsModule } from './modules/things/ThingsModule'

dotenv.config()

const config = new ApplicationConfig({ ...process.env, version })
const application = new Application(config, pino({ level: 'info' }))

application
  .addModules([HttpModule, ThingsModule])
  .register()
  .start()
  .then(() => application.logger.info(`Server v${version} ready`))
  .catch((err: Error) => {
    console.error('===========')
    console.error('FATAL ERROR')
    console.error('===========')
    console.error(err.stack || err)
    process.exit(1)
  })

// Gracefully shutdown the application.
process.on('SIGTERM', () => {
  application
    .stop()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error('Server stopped with error:', e)
      process.exit(1)
    })
})
