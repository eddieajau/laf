/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { jest } from '@jest/globals'
import { rejects } from 'assert'
import HttpErrors from 'http-errors'
import { BaseApiController } from '../../src/api/BaseApiController'
import { ValidationError } from '../../src/api/ValidationError'
import { IApiService, StringDictionary } from '../../src'

describe('api/BaseApiController', () => {
  let service: IApiService<StringDictionary>
  let instance: BaseApiController<StringDictionary, IApiService<StringDictionary>>

  const count = 10
  const data = [{ id: 'the-id' }]
  const page = 1
  const limit = 10

  beforeEach(() => {
    service = {} as IApiService<StringDictionary>
    instance = new BaseApiController(service)
  })

  afterEach(() => jest.clearAllMocks())

  describe('getList', () => {
    beforeEach(() => {
      service.findMany = jest.fn<() => Promise<typeof data>>().mockResolvedValue(data)
    })

    afterEach(() => jest.clearAllMocks())

    it('should get a list, without more', async () => {
      const props = { foo: 'bar', page: 0 }

      service.count = jest.fn<() => Promise<number>>().mockResolvedValue(count)

      const result = await instance.getList(props)

      expect(service.count).toHaveBeenCalledWith(props)
      expect(service.findMany).toHaveBeenCalledWith({ ...props, page, limit })
      expect(result).toEqual({ count, data, page, limit, hasMore: false })
    })

    it('should get a list, with more results', async () => {
      service.count = jest.fn<() => Promise<number>>().mockResolvedValue(11)

      const result = await instance.getList({})

      expect(result).toEqual({ count: 11, data, page, limit, hasMore: true })
    })
  })

  describe('getOne', () => {
    const id = 'the-id'

    afterEach(() => jest.clearAllMocks())

    it('should work', async () => {
      service.findOne = jest.fn<() => Promise<(typeof data)[0]>>().mockResolvedValue(data[0])

      const result = await instance.getOne({ id })

      expect(result).toEqual(data[0])
      expect(service.findOne).toHaveBeenCalledWith(id)
    })

    it('should throw if id not found', async () => {
      service.findOne = jest.fn<() => Promise<(typeof data)[0] | null>>().mockResolvedValue(null)

      await expect(() => instance.getOne({ id: 'not-found' })).rejects.toThrow(HttpErrors.NotFound)
    })

    it('should throw if findOne not implemented', async () => {
      await expect(() => instance.getOne({ id })).rejects.toThrow(
        new HttpErrors.NotImplemented('service.findOne not implemented')
      )
    })
  })

  describe('createOne', () => {
    const body = data[0]

    afterEach(() => jest.clearAllMocks())

    it('should work, without validation', async () => {
      service.createOne = jest.fn<() => Promise<(typeof data)[0]>>().mockResolvedValue(data[0])

      const result = await instance.createOne({ body })

      expect(result).toEqual(data[0])
      expect(service.createOne).toHaveBeenCalledWith(body)
    })

    it('should throw if data is invalid', async () => {
      const expectedError = new ValidationError(['the-error'])

      service.createOne = jest.fn<() => Promise<(typeof data)[0]>>().mockRejectedValue(new Error('should not call'))

      instance.validate = jest.fn(() => {
        throw expectedError
      })

      return rejects(
        () => instance.createOne({ body }),
        (err) => {
          expect(instance.validate).toHaveBeenCalledWith(body)
          expect(err).toBe(expectedError)

          return true
        }
      )
    })

    it('should throw if createOne not implemented', async () => {
      await expect(() => instance.createOne({ body })).rejects.toThrow(
        new HttpErrors.NotImplemented('service.createOne not implemented')
      )
    })
  })
})
