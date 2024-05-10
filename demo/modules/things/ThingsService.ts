/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { injectable } from 'inversify'
import { IApiService, Pagination, paginate } from '../../../src'
import { Thing } from './types'

const things = new Map<string, Thing>([
  ['1', { id: '1', name: 'Red', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['2', { id: '1', name: 'Blue', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['3', { id: '1', name: 'Green', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['4', { id: '1', name: 'Yellow', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['5', { id: '1', name: 'Purple', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['6', { id: '1', name: 'Orange', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['7', { id: '1', name: 'Pink', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['8', { id: '1', name: 'Brown', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['9', { id: '1', name: 'Black', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['10', { id: '1', name: 'White', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['11', { id: '1', name: 'Cyan', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['12', { id: '1', name: 'Magenta', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['13', { id: '1', name: 'Lime', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['14', { id: '1', name: 'Teal', created_at: new Date('2024-01-01T00:00:00Z') }],
  ['15', { id: '1', name: 'Indigo', created_at: new Date('2024-01-01T00:00:00Z') }],
])

/**
 * A service to manage a list of data.
 */
@injectable()
export class ThingsService implements IApiService<Thing> {
  public async count() {
    return things.size
  }

  public async findMany(args: Pagination): Promise<Thing[]> {
    const { page, limit } = paginate(args)

    return Array.from(things.values()).slice((page - 1) * limit, page * limit)
  }

  public async findOne(id: string): Promise<Thing | null> {
    return things.get(id) ?? null
  }
}
