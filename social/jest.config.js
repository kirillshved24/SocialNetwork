module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)', // Указываем Jest трансформировать ESM-модуль axios
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
setupFilesAfterEnv: ['@testing-library/jest-dom'],
};