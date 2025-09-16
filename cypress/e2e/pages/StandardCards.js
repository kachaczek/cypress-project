class StandardCards {

    /**
     * Add a card by searching, selecting value, setting quantity, and continuing
     * @param {string} cardName - The card name to search
     * @param {string|number} value - The value to select (e.g. 100, 200, 300)
     * @param {string|number} quantity - The quantity to set
     * @param {boolean} isOversized - Whether the card is oversized
     */
    addCard(cardName, value, quantity = 1, isOversized = false) {

        // Search card
        cy.get('.px-4.py-3.ps-5.form-control', { timeout: 10000 })
            .should('be.visible')
            .type(cardName);

        // Select card from dropdown
        cy.get('.flex-grow-1.text-wrap', { timeout: 10000 })
            .contains(cardName)
            .click();

        // Declared value
        cy.get('input[id^="value"]', { timeout: 15000 })
            .first()
            .should('be.visible')
            .clear()
            .type(String(value));

        // Set quantity
        cy.get('input[id^="quantity"]', { timeout: 10000 })
            .first()
            .should('be.visible')
            .clear()
            .type(`${quantity}`)

        if (isOversized) {
            cy.get('input[id^="oversized"]').check({ force: true });
        }
    }

    clickContinue() {
        cy.contains('button', 'Continue', { timeout: 10000 })
            .should('be.enabled')
            .click();
    }
}

export const standardCards = new StandardCards();