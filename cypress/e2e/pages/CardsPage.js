class CardsPage {

    chooseCards() {
        cy.get('.osf_step1__IJtFf')
          .find('a[href="/submit/cards/service"]')
          .contains(/cards/i, { timeout: 10000 })
          .should('be.visible', { message: 'Cards not found' })
          .click()
    }

    chooseUserGuest() {
        cy.get('body > div.fade.modal.show').then($modal => {
            if ($modal.length > 0) {
                cy.wrap($modal).find('button').contains('Continue as Guest').click()
            }
        })
    }
}    

export const cardsPage = new CardsPage()