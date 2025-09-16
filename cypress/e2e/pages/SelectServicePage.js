class SelectServicePage {

    chooseStandardCard() {
        cy.get('.osf_step2__y2yPV')
        .contains('.FrontCard2024_title__jr0ub', 'Standard', { matchCase: false })
        .parents('.osf_step2__y2yPV')
        .find('.btn-primary')
        .contains('Submit now', { timeout: 10000 })
        .click();
    }
}

export const selectServicePage = new SelectServicePage();