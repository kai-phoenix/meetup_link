// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Next.jsプロジェクトのdirを指定
    dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
    // DOM操作を使うなら 'jsdom'
    testEnvironment: 'jsdom',
    // テスト開始前に実行されるファイル
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  // 必要に応じて transform を明示的に書く場合も:
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest',
  // },
}
module.exports = createJestConfig(customJestConfig)