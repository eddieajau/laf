# LAF

A Light Application Framework for Node.js and Typescript.

LAF includes a very light application wrapper and a little sugar around Express to provide a backbone for most RESTful API applications.

## Usage

```sh
npm install @eddieajau/laf
```

## Dependency Injection

The Dependency Injection container provides the following bindings:

| Binding              | Module        | Notes                                      |
| -------------------- | ------------- | ------------------------------------------ |
| `ApplicationConfig`  | 'Application` |                                            |
| `LOGGER`             | 'Application` | Your logger.                               |
|                      |               |                                            |
| `HttpModuleConfig`   | 'HttpModule`  |                                            |
| `Router`             | 'HttpModule`  | The Express router.                        |
| `TokenService`       | 'HttpModule`  | A service that supports working with JWTs. |
| `TokenServiceConfig` | 'HttpModule`  |                                            |

## Demo

```sh
npm run demo
```

## Documentation

- [Architecture](.docs/architecture.md)
- [Base Configuration](./docs/configure.md)
- [Dependency Injection](./docs/di.md)
- [Local Development](./docs/local.md)
