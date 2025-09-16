
Cypress.Commands.add('closePopups', () => {
  const selectors = [
    '#onetrust-accept-btn-handler',
    '#onetrust-close-btn-handler',
    '.interactive-close-button',
    'button[aria-label="Close"]',
    '.modal .close',
    '.popup .close',
    '.overlay .close',
    '.close-btn',
    '.close-icon',
    '.widget',
    '.hs_cos_wrapper_widget'
  ];

  selectors.forEach((selector) => {
    cy.get('body').then($body => {
      selectors.forEach(selector => {
        $body.find(selector).each((_, el) => {
          if (Cypress.$(el).is(':visible')) {
            cy.wrap(el).click({ force: true });
          }
        });
      });
    });
  });
});
