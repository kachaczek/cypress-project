// Global configuration and behavior that modifies Cypress.

Cypress.on('uncaught:exception', (err) => {
  // Ignore specific DataCloneError from Beckett modal
  if (err.name === 'DataCloneError' || err.message.includes('postMessage')) {
    return false   // prevents Cypress from failing the test
  }
})

import 'cypress-if'
import './commands'
