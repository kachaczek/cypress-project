

utworz projekt od zera, stworzy package.json
To utworzy katalog node_modules i zainstaluje Cypress w devDependencies.
npm init -y
npm test


# 1. Zainicjalizuj npm (jeśli package.json nie istnieje)
npm init -y

# 2. Zainstaluj Cypress jako dev dependency
npm install cypress --save-dev

# 3. Sprawdź, czy Cypress działa
npx cypress open   # GUI
npx cypress run    # headless (używane w "npm test")
pro tip: zawsze używaj npx cypress ... jeśli masz wątpliwości – wtedy masz pewność, że odpala się Cypress z node_modules/.bin, a nie jakiś globalny.



npm install --save-dev cypress-if
