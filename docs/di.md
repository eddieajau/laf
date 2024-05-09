# Dependency Injection

One of the principles of [SOLID](https://en.wikipedia.org/wiki/SOLID) is Dependecy Inversion.

In this framework we use [Inversify](https://inversify.io) to act as a Dependency Injection container.

The `Application` class owns an instance of the container, and it passes this instance to each `Module`.

The main concepts to understand are:

- [Support for classes](https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md)
- [Injecting a constant or dynamic value](https://github.com/inversify/InversifyJS/blob/master/wiki/value_injection.md)
