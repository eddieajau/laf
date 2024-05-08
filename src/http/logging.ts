/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

// import httpLogger from 'pino-http'
// import { Logger } from '../application/Application'

// export function logging(logger: Logger) {
//   return httpLogger({
//     logger,
//     redact: {
//       paths: ['req.headers', 'res.headers'],
//       remove: true,
//     },
//     // Define a custom logger level
//     customLogLevel: function (req, res, err) {
//       if (res.statusCode >= 400 && res.statusCode < 500) {
//         return 'warn'
//       } else if (res.statusCode >= 500 || err) {
//         return 'error'
//       } else if (res.statusCode >= 300 && res.statusCode < 400) {
//         return 'silent'
//       }

//       return 'info'
//     },
//   })
// }
