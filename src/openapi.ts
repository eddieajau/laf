/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

export class OpenApiParameter {
  static limit = {
    name: 'limit',
    in: 'query',
    description: 'The number of items to return per page.',
    required: false,
    schema: {
      type: 'integer',
      example: 10,
      minimum: 0,
      maximum: 100,
    },
  }

  static page = {
    name: 'page',
    in: 'query',
    description: 'The page number.',
    required: false,
    schema: { type: 'integer', example: 1, minimum: 1 },
  }
}

export class OpenApiResponse {
  static BadRequest = {
    description: 'The body/input was invalid (has `message` property), or validation failed (has `errors` property).',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            {
              $ref: '#/components/schemas/Error',
            },
            {
              $ref: '#/components/schemas/ValidationError',
            },
          ],
        },
      },
    },
  }

  static NotFound = {
    description: 'The specified resource was not found.',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  }
}

export class OpenApiSchema {
  /**
   * Generic error schema.
   */
  static Error = {
    type: 'object',
    description: 'A generic error object that includes a `message` string and, optionally, an HTTP `status` code.',
    properties: {
      message: {
        type: 'string',
      },
      status: {
        type: 'number',
      },
    },
    required: ['message'],
  }

  /**
   * Generic validation error schema.
   */
  static ValidationError = {
    type: 'object',
    description: 'An object with a list of errors from validation.',
    properties: {
      errors: {
        description: 'An array of validation errors.',
        type: 'array',
        items: {
          type: 'string',
        },
      },
      message: {
        type: 'string',
      },
    },
    required: ['errors', 'message'],
  }

  /**
   * The OpenAPI schema for the ListResult response type.
   */
  static ListResult = {
    type: 'object',
    properties: {
      count: {
        type: 'integer',
        example: 5,
      },
      data: {
        type: 'object',
      },
      page: {
        type: 'integer',
        example: 1,
      },
      limit: {
        type: 'integer',
        example: 10,
      },
      hasMore: {
        type: 'boolean',
        example: false,
      },
    },
  }
}
