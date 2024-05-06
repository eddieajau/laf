/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

export enum ESortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface IResult<T> {
  count: number
  data: T[]
  page: number
  limit: number
  hasMore: boolean
}
