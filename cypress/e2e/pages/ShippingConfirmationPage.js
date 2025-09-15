class ShippingConfirmationPage {

    clickCheckBoxes() {
        cy.get('.osf_paper__mskN0 input[type="checkbox"]').check({ force: true });

    }

    clickCheckout() {
        // cy.get('.btn-block.btn.btn-primary').click();
        cy.contains('button', 'Checkout', { timeout: 10000 })
            .should('be.enabled')
            .click();
    }
}

export const shippingConfirmationPage = new ShippingConfirmationPage()