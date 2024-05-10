/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { Router } from 'express'
import { Module, asyncHandler } from '../../../src'
import { ThingsController } from './ThingsController'
import { ThingsService } from './ThingsService'

export class ThingsModule extends Module {
  public register() {
    this.container.bind(ThingsService).toSelf()
    this.container.bind(ThingsController).toSelf()
  }

  public async start() {
    const controller = this.container.get(ThingsController)
    const router = this.container.get(Router)

    router.get(
      '/things',
      asyncHandler(({ query, params }) => controller.getList({ ...query, ...params }))
    )

    router.get(
      '/things/:id',
      asyncHandler(({ params }) => controller.getOne(params as { id: string }))
    )
  }
}
