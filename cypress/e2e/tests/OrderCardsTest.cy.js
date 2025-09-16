import { homePage } from "../pages/HomePage";
import { standardCards } from "../pages/StandardCards";
import { shippingPage } from "../pages/ShippingPage";
import {shippingConfirmationPage} from "../pages/ShippingConfirmationPage";
import { cardsPage } from "../pages/CardsPage";
import { selectServicePage } from "../pages/SelectServicePage";

describe('Order Cards', () => {
  beforeEach(() => {
    homePage.visit();
    cy.closePopups();
    cy.fixture('user').as('user');
    cy.fixture('cards').as('cards');
  })

  it('should choose cards as guest', () => {

    // clear everything
    cy.closePopups();
    homePage.chooseCards();
    cy.closePopups();
    homePage.clickSubmit();

    // run again after navigation
    cy.closePopups();
    cardsPage.chooseCards();

    cy.url().should('include', '/submit/cards/service');

    // catch International popup
    cy.closePopups();
    cardsPage.chooseUserGuest();

    // just in case before next steps
    cy.closePopups();
    cy.url().should('include', '/submit/cards/service');
    selectServicePage.chooseStandardCard();

    // catch International popup
    cy.closePopups();

    // add 5 cards from fixture
    cy.get('@cards').then(cards => {
        const values = [100, 200, 300, 400, 500];

        standardCards.addCard(cards.card1, values[0], 1, true);
        cy.get('[data-test-id="card-1"]').scrollIntoView()
          .within(() => {
            cy.get('.fw-semibold')
              .should('be.visible')
              .and('contain.text', cards.card1);

            cy.get('input[id^="quantity"]')
              .should('have.value', '1');

            cy.get('input[id^="value"]')
              .should('have.value', values[0].toString());
        });

        standardCards.addCard(cards.card2, values[1], 1, false);
        cy.get('[data-test-id="card-2"]').scrollIntoView()
          .within(() => {
            cy.get('.fw-semibold')
              .should('be.visible')
              .and('contain.text', cards.card2);

            cy.get('input[id^="quantity"]')
              .should('have.value', '1');

            cy.get('input[id^="value"]')
              .should('have.value', values[1].toString());
        });

        standardCards.addCard(cards.card3, values[2], 1, false);
        cy.get('[data-test-id="card-3"]').scrollIntoView()
          .within(() => {
            cy.get('.fw-semibold')
              .should('be.visible')
              .and('contain.text', cards.card3);

            cy.get('input[id^="quantity"]')
              .should('have.value', '1');

            cy.get('input[id^="value"]')
              .should('have.value', values[2].toString());
        });

        standardCards.addCard(cards.card4, values[3], 1, false);
        cy.get('[data-test-id="card-4"]').scrollIntoView()
          .within(() => {
            cy.get('.fw-semibold')
              .should('be.visible')
              .and('contain.text', cards.card4);

            cy.get('input[id^="quantity"]')
              .should('have.value', '1');

            cy.get('input[id^="value"]')
              .should('have.value', values[3].toString());
        });

        standardCards.addCard(cards.card5, values[5], 1, false);
        cy.get('[data-test-id="card-5"]').scrollIntoView()
          .within(() => {
            cy.get('.fw-semibold')
              .should('be.visible')
              .and('contain.text', cards.card5);

            cy.get('input[id^="quantity"]')
              .should('have.value', '1');

            cy.get('input[id^="value"]')
              .should('have.value', values[4].toString());
        });
    });

    standardCards.clickContinue();

    cy.get('@user').then(user => {
      shippingPage.fillName(user.name);
      shippingPage.fillLastName(user.lastName);
      shippingPage.fillStreet(user.line1);
      shippingPage.fillCity(user.city);
      shippingPage.fillCountry(user.country);
      shippingPage.fillZipCode(user.zipcode);
      shippingPage.fillState(user.state);
      shippingPage.fillPhone(user.phone);
      shippingPage.fillEmail(user.email);

      // asserts
      cy.get('input[name="firstName"], #firstName, [data-testid="firstName"]', { timeout: 15000 })
        .should('have.value', user.name);

      cy.get('input[name="lastName"], #lastName, [data-testid="lastName"]', { timeout: 15000 })
        .should('have.value', user.lastName);

      cy.get('input[name="line1"], #line1, [data-testid="address1"]', { timeout: 15000 })
        .should('have.value', user.line1);

      cy.get('input[name="city"], #city, [data-testid="city"]', { timeout: 15000 })
        .should('have.value', user.city);

      cy.get('input[id^="zipcode"], #zip, [data-testid="zipcode"]', { timeout: 15000 })
        .should('have.value', user.zipcode);

      cy.get('input[id^="phone"], #phone, [data-testid="phone"]', { timeout: 15000 })
        .invoke('val')
        .then(val => {
          const actualDigits = val.replace(/\D/g, '');
          const expectedDigits = user.phone.replace(/\D/g, '');
          expect(actualDigits.endsWith(expectedDigits.slice(-9))).to.be.true;
      });

      cy.get('input[id^="email"], #email, [data-testid="email"]', { timeout: 15000 })
        .should('have.value', user.email);
    })

    shippingPage.selectInternationalShipping();
    shippingPage.agreeAndContinue();

    shippingConfirmationPage.clickCheckBoxes();
    shippingConfirmationPage.clickCheckout();
    shippingConfirmationPage.verifyOrderSummary();
  });
})