/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  resolver: 'react-native-reanimated/jest/resolver',
  setupFiles: ['./test/setup.ts'],
  clearMocks: true,
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/svgMock.tsx',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
