/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import HttpErrors from 'http-errors'
import { injectable } from 'inversify'
import { IPagination, paginate } from '../pagination'
import { IApiService, IListResult } from './types'

/**
 * This class provide a base implementation to support common API operations.
 */
@injectable()
export class BaseApiController<Type, Service extends IApiService<Type, Args>, Args = object> {
  constructor(protected service: Service) {}

  /**
   * Get a list of items and returning with pagination information.
   */
  public async getList(args: Args & IPagination): Promise<IListResult<Type>> {
    const { page, limit } = paginate(args)
    const count = await this.service.count(args)
    const data = await this.service.findMany({ ...args, page, limit })

    return { count, data, page, limit, hasMore: page * limit < count }
  }

  /**
   * Get one item by id.
   */
  public async getOne({ id }: { id: string }): Promise<Type> {
    if (!this.service.findOne) {
      throw HttpErrors.NotImplemented('service.findOne not implemented')
    }

    const result = await this.service.findOne(id)

    if (!result) {
      throw HttpErrors.NotFound()
    }

    return result
  }
}
