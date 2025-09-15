import { homePage } from "../pages/HomePage";
import { standardCards } from "../pages/StandardCards";
import { shippingPage } from "../pages/ShippingPage";
import {shippingConfirmationPage} from "../pages/ShippingConfirmationPage"
import { cardsPage } from "../pages/CardsPage";
import { selectServicePage } from "../pages/SelectServicePage";

describe('Order Cards', () => {
  beforeEach(() => {
    homePage.visit();
    cy.acceptCookies();
    // cy.fixture('user').then(user => {
    //   Cypress.env('user', user);
    // });
    // cy.fixture('cards').then(cards => {
    //   Cypress.env('cards', cards);
    // });
    cy.fixture('user').as('user');
    cy.fixture('cards').as('cards');
  })

  it('should choose cards as guest', () => {

    // clear everything once
    cy.closePopups();
    // cy.url().should
    homePage.chooseCards();
    homePage.clickSubmit();

    // run again after navigation
    cy.closePopups();

    cardsPage.chooseCards();

    cy.url().should('include', '/submit/cards/service');

    // catch International popup
    cy.closePopups()
    cardsPage.chooseUserGuest()

    // just in case before next steps
    cy.closePopups();
    cy.url().should('include', '/submit/cards/service')
    selectServicePage.chooseStandardCard()

    cy.url().should('include', '/submit/cards/service');

    // add 5 cards from fixture
    cy.get('@cards').then(cards => {
      standardCards.addCard(cards.card1, 100, true);
      standardCards.addCard(cards.card2, 200);
      standardCards.addCard(cards.card3, 300);
      standardCards.addCard(cards.card4, 400);
      standardCards.addCard(cards.card5, 500);
    });

    // cy.url().should('include', '/submit/cards/standard');
    standardCards.clickContinue();
    standardCards.verifyOrderSummary();

    // shippingPage.fillAddress()

    cy.get('@user').then(user => {
      shippingPage.fillName(user.name)
      shippingPage.fillLastName(user.lastName)
      shippingPage.fillStreet(user.line1)
      shippingPage.fillCity(user.city)
      shippingPage.fillCountry(user.country)
      shippingPage.fillZipCode(user.zipcode)
      shippingPage.fillState(user.state)
      shippingPage.fillPhone(user.phone)
      shippingPage.fillEmail(user.email)

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
          const actualDigits = val.replace(/\D/g, '');     // actual field digits
          const expectedDigits = user.phone.replace(/\D/g, ''); // expected digits

          // compare last 9 digits (ignoring spaces, +48, etc.)
          expect(actualDigits.endsWith(expectedDigits.slice(-9))).to.be.true;
      });

      // cy.get('input[id^="phone"], #phone, [data-testid="phone"]', { timeout: 15000 })
      //   .should('have.value', user.phone);

      cy.get('input[id^="email"], #email, [data-testid="email"]', { timeout: 15000 })
        .should('have.value', user.email);
    })

    shippingPage.selectInternationalShipping()
    shippingPage.agreeAndContinue();

    // cy.url().should('include', '/submit/cards/shipping');
    shippingConfirmationPage.clickCheckBoxes()
    shippingConfirmationPage.clickCheckout()
  });
})
