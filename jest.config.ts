/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: true,
}

export default config
