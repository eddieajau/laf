/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 * @note      2024-05-06 Jest has trouble destructuring some non-type exports.
 */

import { jest } from '@jest/globals'
import { Request, Response } from 'express'
import HttpErrors from 'http-errors'
import { handleError, handleNotFound } from '../../src/http/errors'

describe('http/errors', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('handleNotFound', () => {
    it('should respond with a NotFound error', () => {
      const req = {} as Request
      const res = {} as Response
      const next = jest.fn()

      handleNotFound(req, res, next)

      expect(next).toHaveBeenCalledWith(new HttpErrors.NotFound())
    })
  })

  describe('handleError', () => {
    it('should respond with an error', () => {
      const error = new HttpErrors.BadRequest()
      const req = {} as Request
      const res = {
        headersSent: false,
        send: jest.fn(),
        status: jest.fn(),
      } as unknown as Response
      const next = jest.fn()

      handleError(error, req, res, next)

      expect(res.status).toHaveBeenCalledWith(error.status)
      expect(res.send).toHaveBeenCalledWith(error)
      expect(res.err).toBe(error)
    })

    it('should send 500 status if not defined in the error', () => {
      const error = new Error('generic error')
      const req = {} as Request
      const res = {
        headersSent: false,
        send: jest.fn(),
        status: jest.fn(),
      } as unknown as Response
      const next = jest.fn()

      handleError(error, req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith(error)
      expect(res.err).toBe(error)
    })

    it('should call next if headers are sent', () => {
      const error = new HttpErrors.InternalServerError()
      const req = {} as Request
      const res = {
        headersSent: true,
      } as unknown as Response
      const next = jest.fn()

      handleError(error, req, res, next)

      expect(next).toHaveBeenCalledWith(error)
      expect(res.err).toBeUndefined()
    })
  })
})
