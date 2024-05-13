/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { OpenApiParameter, OpenApiResponse, OpenApiSchema } from '../src'

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
    it('BadRequest', () => {
      expect(OpenApiResponse.BadRequest).toBeDefined()
    })

    it('NotFound', () => {
      expect(OpenApiResponse.NotFound).toBeDefined()
    })
  })

  describe('OpenApiSchema', () => {
    it('Error', () => {
      expect(OpenApiSchema.Error).toBeDefined()
    })

    it('ValidationError', () => {
      expect(OpenApiSchema.ValidationError).toBeDefined()
    })

    it('ListResult', () => {
      expect(OpenApiSchema.ListResult).toBeDefined()
    })
  })
})
