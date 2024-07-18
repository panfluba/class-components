import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.(svg|jpg|jpeg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.scss$': 'jest-css-modules-transform',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
