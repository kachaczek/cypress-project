Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then(($body) => {
    const button = $body.find('#onetrust-accept-btn-handler')
    if (button.length > 0 && button.is(':visible')) {
      cy.wrap(button).click({ force: true })
    } else {
      cy.log('Accept Cookies button not visible, skipping')
    }
  })
})

Cypress.Commands.add('closeInternationalPopup', () => {
  cy.get('body').then($body => {
    const $closeBtn = $body.find('button[aria-label="Close"]')

    if ($closeBtn.length > 0 && $closeBtn.is(':visible')) {
      cy.wrap($closeBtn).click({ force: true })
    } else {
      cy.log('Close button not visible, skipping')
    }
  })
})

Cypress.Commands.add('dismissPopups', () => {
  const selectors = [
    '#onetrust-accept-btn-handler',
    '#onetrust-close-btn-handler',
    '.modal',
    '.popup',
    '.overlay',
    '.international-modal',
    '.close',
    '.close-btn',
    '.close-icon',
    'button[aria-label="Close"]'
  ];

  selectors.forEach(sel => {
    cy.get('body').then($body => {
      const el = $body.find(sel);

      if (el.length > 0 && el.is(':visible')) {
        cy.log(`Closing popup: ${sel}`);
        cy.wrap(el).click({ force: true });
      }
    });
  });
});

Cypress.Commands.add('closePopups', () => {
  const selectors = [
    '#onetrust-accept-btn-handler',     // OneTrust accept
    '#onetrust-close-btn-handler',      // OneTrust close
    '.interactive-close-button',        // Beckett international popup
    'button[aria-label="Close"]',       // generic close button
    '.modal .close',                    // generic modal close
    '.popup .close',                    
    '.overlay .close',                  
    '.close-btn',
    '.close-icon'
  ];

  selectors.forEach((selector) => {
    // try to get the element if it exists
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout: 2000 })   // will retry up to 2s
          .if('visible')                      // only if visible
          .click({ force: true })
          .then(() => cy.log(`Closed popup: ${selector}`))
      }
    })
  })
})

