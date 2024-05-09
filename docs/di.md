# Dependency Injection

One of the principles of [SOLID](https://en.wikipedia.org/wiki/SOLID) is Dependecy Inversion.

In this framework we use [Inversify](https://inversify.io) to act as a Dependency Injection container.

The `Application` class owns an instance of the container, and it passes this instance to each `Module`.
