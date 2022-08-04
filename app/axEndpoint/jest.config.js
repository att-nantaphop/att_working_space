module.exports = {
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
}
