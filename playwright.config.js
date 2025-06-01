const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Carpeta donde están las pruebas
  timeout: 15000, // Tiempo máximo para cada prueba (en ms)
  retries: 1, // Reintentos en caso de fallo
  use: {
    headless: false, // Cambia a true si quieres pruebas sin interfaz gráfica
    baseURL: 'http://localhost:3000', // URL base de tu aplicación
    screenshot: 'only-on-failure', // Captura de pantalla solo en caso de fallo
    video: 'retain-on-failure', // Guarda videos solo si falla la prueba
    trace: 'on-first-retry', // Habilita el trace viewer en el primer reintento
  },
  projects: [
    {
      name: 'chromium', // Pruebas en Chrome
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox', // Pruebas en Firefox
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit', // Pruebas en Safari, Apple
      use: { browserName: 'webkit' },
    },
  ],
  workers: 4, // Número de hilos paralelos
  reporter: [
    ['html', { outputFolder: './playwright-report' }],
    ['junit', { outputFile: './test-results/results.xml' }] // JUnit reporter
  ]
});


// // Other version

// // @ts-check
// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   // use: {
//   //   /* Base URL to use in actions like `await page.goto('/')`. */
//   //   // baseURL: 'http://localhost:3000',

//   //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//   //   trace: 'on-first-retry',
//   // },
//   use: {
//     headless: false, // Cambia a true si quieres pruebas sin interfaz gráfica
//     baseURL: 'http://localhost:3000', // URL base de tu aplicación
//     screenshot: 'only-on-failure', // Captura de pantalla solo en caso de fallo
//     video: 'retain-on-failure', // Guarda videos solo si falla la prueba
//     trace: 'on-first-retry', // Habilita el trace viewer en el primer reintento
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },

//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });
