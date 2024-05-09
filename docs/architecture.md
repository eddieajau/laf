# Design Patterns

## Application

The application is the thing that _runs_. It controls a life-cycle of 3 steps:

1. Register - this step is used to register all the dependencies.
2. Start - this step is used to start the application running.
3. Stop - this step is used to gracefully stop the application running.

## Modules

An application is broken up into modules, added via the `addModules` method in the application.

Each module has a method for the life-cycle step that the application will call in order (the order of the array passed to `addModules`).

You only need to implement the life-cycle step that makes sense for the module. For example:

```ts
import { Module } from '@eddieajau/laf'

export MyModule extends Module {
  public register() {
    // Register things in the container.
  }

  public async start() {
    // Start the module, for example establish your database connection.
  }

  public stop() {
    // Optionally perform any operations to gracefully stop things you started,
    // like disconnecting from the database.
  }
}
```

See the `ThingsModule` in the `/demo` folder as an example.
