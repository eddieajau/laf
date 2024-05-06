/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

const MAX_LIMIT = 100

export interface IPagination {
  page?: number
  limit?: number
}

export type Pagination = {
  page: number
  limit: number
}

/**
 * Destructes a page and limit from an input and returns normalised values within appropriate limits.
 */
export const paginate = ({ page, limit }: IPagination): Pagination => ({
  page: Math.max(1, Number(page) || 0),
  limit: Number.isInteger(limit) ? Math.max(0, Math.min(Number(limit), MAX_LIMIT)) : 10,
})

/**
 * Converts a page-limit strategy to a skip-take strategy.
 */
export const toSkipTake = ({ page, limit }: Pagination): { skip: number; take: number } => ({
  skip: (page - 1) * limit,
  take: limit,
})
