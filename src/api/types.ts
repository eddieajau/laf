/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { Pagination } from '../pagination'

/**
 * Enum that defines a standard for sort direction.
 */
export enum ESortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

/**
 * An interface that defines the shape for an API service that connects with a data source.
 */
export interface IApiService<Type, Args = object, CreateInput = Partial<Type>, UpdateInput = Partial<Type>> {
  count(args?: Args): Promise<number>

  findMany(args: Args & Pagination): Promise<Type[]>

  findOne?(id: string): Promise<Type | null>

  /**
   * @throws string[] - An array of error messages.
   */
  validate?(object: CreateInput | UpdateInput): void

  createOne?(object: CreateInput): Promise<Type>
}

/**
 * An interface that defines the shape of an API response for a list of data.
 */
export interface IListResult<Type> {
  count: number
  data: Type[]
  page: number
  limit: number
  hasMore: boolean
}
