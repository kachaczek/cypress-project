class ShippingConfirmationPage {

    clickCheckBoxes() {
        cy.get('.osf_paper__mskN0 input[type="checkbox"]').check({ force: true });
    }

    clickCheckout() {
        cy.contains('button', 'Checkout', { timeout: 10000 })
            .should('be.enabled')
            .click();
    }

    // Verify order summary
    verifyOrderSummary() {
        cy.get('[data-test-id="order-summary"]', { timeout: 20000 })
        .should('contain.text', 'Subtotal')
        .should('contain.text', 'Total');
    }
}

export const shippingConfirmationPage = new ShippingConfirmationPage()