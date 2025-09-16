const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://beckett.com',
    viewportWidth: 1440,
    viewportHeight: 900,
    supportFile: 'cypress/support/e2e.js'
  }
});