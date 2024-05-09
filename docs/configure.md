# Configuration

| Environment Variable | Context             | Notes                                                                     |
| -------------------- | ------------------- | ------------------------------------------------------------------------- |
| `BUILD_NUMBER`       | `ApplicationConfig` | An optional build number.                                                 |
| `HTTP_JWT_ISSUER`    | `HttpModule`        | An optional issuer for an authentication JWT.                             |
| `HTTP_JWT_SECRET`    | `HttpModule`        | **Required**. The secret for signing and verifying an authentication JWT. |
| `HTTP_PORT`          | `HttpModule`        | The port that the Express server will run on. Default: `3000`.            |
