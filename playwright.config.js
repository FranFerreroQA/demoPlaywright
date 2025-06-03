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
  workers: 3, // Número de hilos paralelos
  reporter: [
    ['html', { outputFolder: './playwright-report' }],
    ['junit', { outputFile: './test-results/results.xml' }] // JUnit reporter
  ]
});
