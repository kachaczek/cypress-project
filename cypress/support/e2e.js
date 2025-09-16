// Global configuration and behavior that modifies Cypress.

Cypress.on('uncaught:exception', (err) => {
  if (err.name === 'DataCloneError' || err.message.includes('postMessage')) {
    return false
  }
})

import 'cypress-if'
import './commands'
