const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
    testDir: './tests/browser',
    workers: 1,
    use: { baseURL: 'http://127.0.0.1:5173', trace: 'retain-on-failure' },
    webServer: { command: process.env.TEST_PRODUCTION ? 'npm start' : 'npm run dev', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI, timeout: 30000 },
});
