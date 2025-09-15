// import 'cypress-if'
// install
// npm install --save-dev cypress-if

class HomePage {
    visit() {
        cy.visit('https://beckett.com', {
            headers: {
                'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129 Safari/537.36'
            }
        })
    }

    chooseCards() {
        cy.get('body').then($body => {
            if ($body.find('[data-testid="service-cards"]').length) {
            } else if ($body.find('[data-service="cards"]').length) {
                cy.get('[data-service="cards"]').click()
            }
            else {
                cy.get('.flex-grow-1.app-main')
                .contains(/cards/i, { timeout: 10000 })
                .should('be.visible', { message: 'Cards not found' })
                .scrollIntoView()
            }
        })
    }

    clickSubmit() {
        cy.get('.navbar.navbar-dark.px-2.py-0.flex-nowrap')
        .find('.align-self-center.d-sm-block.mobile-login.me-1.btn-toolbar')
        .find('.btn.btn-primary.me-3.Layout_submitButton__7q0pz.Layout_lh30__t3Gt_')
        .contains(/Submit/i, { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible', { message: 'Submit button not visible' })
        .click()
    }
}

export const homePage = new HomePage()
