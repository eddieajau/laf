/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { Container } from 'inversify'
import { Module } from '../../src'

describe('application/Module', () => {
  let container: Container
  let instance: Module

  beforeEach(() => {
    container = new Container()
    instance = new Module(container)
  })

  it('should have a default "register" method', () => {
    expect(instance.register()).toBeUndefined()
  })

  it('should have a default "start" method', async () => {
    await expect(instance.start()).resolves.toBeUndefined()
  })

  it('should have a default "stop" method', async () => {
    await expect(instance.stop()).resolves.toBeUndefined()
  })
})
