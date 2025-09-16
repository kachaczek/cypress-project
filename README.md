# E2E Automation – Cypress & JavaScript

This repository contains end-to-end (E2E) automated tests for the web application: https://beckett.com/
using Cypress and JavaScript.  
The purpose of these tests is to validate the shopping experience, including adding cards to the basket,
filling shipping details, and verifying key UI workflows.

## Project Overview

The main scenario covers:

1. Visit [https://beckett.com/](https://beckett.com/) as a guest and select CARDS.
2. Choose Standard service.  
3. Add 5 cards to the basket:
   - Each with Quantity = 1.  
   - Declared values increasing: $100, $200, $300, $400, $500.  
   - First card has *Oversized Card ($8) checkbox ticked.  
4. Fill in shipping details with valid user data.  
5. Select International ($64) shipping.  
6. Accept all required consents/checkboxes.  
7. Proceed to checkout (no payment execution).  
8. Verify basket totals, shipping, and form fields.

## Features

- **Page Object Model (POM):** Ensures reusable test code.  
- **Fixtures:** JSON files for cards and user profiles to support data-driven tests.  
- **Support:** Global Cypress commands in `cypress/support/commands.js`.  
- **Browser Support:** Electron.

## Prerequisites

- Node.js and npm installed  
- Chrome and/or Firefox installed  

## Installation & Setup

1. **Clone the repository:**
```bash
git clone git@github.com:kachaczek/cypress-project.git
  ```

2. **Initialize npm:**
```bash
npm init -y
```

3. **Install dependencies:**
```bash
npm install cypress --save-dev
npm install --save-dev cypress-if
```

## Running Tests
```bash
npm test
npx cypress open (GUI)
npx cypress run (command line)
```