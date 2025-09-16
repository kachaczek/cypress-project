class ShippingPage {

  fillName(name) {
    expect(name, "name must be defined").to.not.be.undefined
    cy.get('input[id^="firstName"]', { timeout: 15000 }).clear().type(name)
  }

  fillLastName(lastName) {
    expect(lastName, "lastName must be defined").to.not.be.undefined
    cy.get('input[id^="lastName"]', { timeout: 15000 }).clear().type(lastName)
  }
  
  fillStreet(street) {
    expect(street, "street must be defined").to.not.be.undefined
    cy.get('input[id^="line1"]', { timeout: 15000 }).clear().type(street)
  }

  fillCity(city) {
    expect(city, "city must be defined").to.not.be.undefined
    cy.get('input[id^="city"]', { timeout: 15000 }).clear().type(city)
  }

  fillZipCode(zipcode) {
    expect(zipcode, "zipcode must be defined").to.not.be.undefined
    cy.get('input[id^="zipcode"]', { timeout: 15000 }).type(zipcode);
}

  fillPhone(phone) {
    expect(phone, "phone must be defined").to.not.be.undefined;
    const digitsOnly = phone.replace(/\D/g, '');
    cy.get('.phoneInput.react-tel-input .flag-dropdown', { timeout: 15000 }).click();
    cy.get('.flag.pl', { timeout: 10000 }).click();
    cy.get('input[id^="phone"]', { timeout: 15000 })
      .clear()
      .type(digitsOnly, { delay: 100 });
  }

  fillEmail(email) {
    expect(email, "state must be defined").to.not.be.undefined
    cy.get('input[id^="email"]', { timeout: 15000 }).clear().type(email)
  }

  fillState(state) {
    expect(state, "state must be defined").to.not.be.undefined
        cy.get('body', { timeout: 15000 }).then($body => {
      if ($body.find('select[name="state"], select[id^="state"], select.form-select').length) {
        cy.get('select[name="state"], select[id^="state"], select.form-select', { timeout: 10000 })
        cy.contains('label', 'State')
        .invoke('attr', 'for') // get id from label
        .then(id => {
            cy.get(`#${id}`, { timeout: 10000 })
            .select("Łódź Voivodeship");
        });
        return;
      }
    })
  }

  fillCountry(country) {
    expect(country, "country must be defined").to.not.be.undefined
    cy.get('select[id^="country"]', { timeout: 15000 }).select(country)
  }

  selectInternationalShipping() {
    cy.contains('International').click()
  }

  agreeAndContinue() {
    cy.get('input[type="checkbox"]').check({ force: true })
    cy.contains('Continue').click()
  }
}

export const shippingPage = new ShippingPage()