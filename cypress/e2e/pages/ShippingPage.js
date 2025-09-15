class ShippingPage {

//   fillAddress() {
//     cy.get('input[id^="firstName"]', { timeout: 15000 }).type('John');
//     cy.get('input[id^="lastName"]', { timeout: 15000 }).type('Doe');
//     cy.get('input[id^="line1"]', { timeout: 15000 }).type('123 Cypress St');
//     cy.get('input[id^="city"]', { timeout: 15000 }).type('Lodz');
//     cy.get('input[id^="zipcode"]', { timeout: 15000 }).type('00-001');
//     cy.get('select[id^="country"]', { timeout: 15000 }).select('Poland');
//     cy.get('input[id^="email"]', { timeout: 15000 }).type('john.doe@example.com');

//     cy.get('.phoneInput.react-tel-input .flag-dropdown', { timeout: 15000 }).click();
//     cy.get('.flag.pl', { timeout: 10000 }).click();
//     cy.get('input[id^="phone"]').type('+48234567877');


//     // Operate on the body so we can inspect what exists in the current DOM
//     cy.get('body', { timeout: 15000 }).then($body => {
//       if ($body.find('select[name="state"], select[id^="state"], select.form-select').length) {
//         cy.get('select[name="state"], select[id^="state"], select.form-select', { timeout: 10000 })
//         cy.contains('label', 'State')
//         .invoke('attr', 'for') // get id from label
//         .then(id => {
//             cy.get(`#${id}`, { timeout: 10000 })
//             .select("Łódź Voivodeship");
//         });
//         return;
//       }
//     })


//   }

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

    // normalize: keep only digits
    const digitsOnly = phone.replace(/\D/g, '');

    // choose country first
    cy.get('.phoneInput.react-tel-input .flag-dropdown', { timeout: 15000 }).click();
    cy.get('.flag.pl', { timeout: 10000 }).click();

    // clear and type only digits
    cy.get('input[id^="phone"]', { timeout: 15000 })
      .clear()
      .type(digitsOnly, { delay: 100 }); // small delay helps with react-tel-input
  }


  // fillPhone(phone) {
  //   expect(phone, "phone must be defined").to.not.be.undefined
  //   cy.get('.phoneInput.react-tel-input .flag-dropdown', { timeout: 15000 }).click();
  //   cy.get('.flag.pl', { timeout: 10000 }).click();
  //   cy.get('input[id^="phone"]').type(phone);
  // }

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