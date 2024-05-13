/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { OpenApiParameter, OpenApiResponse } from '../src'

describe('openapi', () => {
  describe('OpenApiParameter', () => {
    it('limit', () => {
      expect(OpenApiParameter.limit).toBeDefined()
    })

    it('page', () => {
      expect(OpenApiParameter.page).toBeDefined()
    })
  })

  describe('OpenApiResponse', () => {
    it('Error', () => {
      expect(OpenApiResponse.Error).toBeDefined()
    })

    it('ValidationError', () => {
      expect(OpenApiResponse.ValidationError).toBeDefined()
    })

    it('BadRequest', () => {
      expect(OpenApiResponse.BadRequest).toBeDefined()
    })

    it('NotFound', () => {
      expect(OpenApiResponse.NotFound).toBeDefined()
    })

    it('ListResult', () => {
      expect(OpenApiResponse.ListResult).toBeDefined()
    })
  })
})
