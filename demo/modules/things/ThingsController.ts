/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { injectable } from 'inversify'
import { BaseApiController } from '../../../src'
import { ThingsService } from './ThingsService'
import { Thing } from './types'

@injectable()
export class ThingsController extends BaseApiController<Thing, ThingsService> {
  public constructor(service: ThingsService) {
    super(service)
  }
}
