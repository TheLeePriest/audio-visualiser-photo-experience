module.exports = {
    setupFilesAfterEnv: [require.resolve('./testing/testConfig/setupTests.js')],
    collectCoverageFrom: ['src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**'],
};
