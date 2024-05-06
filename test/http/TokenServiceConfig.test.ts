/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import { TokenServiceConfig } from '../../src'

describe('TokenServiceConfig', () => {
  it('should work', () => {
    const env = {
      HTTP_JWT_ISSUER: 'issuer',
      HTTP_JWT_SECRET: 'secret',
    } as NodeJS.ProcessEnv

    const instance = new TokenServiceConfig(env)

    expect(instance.issuer).toBe('issuer')
    expect(instance.secret).toBe('secret')
  })
})
