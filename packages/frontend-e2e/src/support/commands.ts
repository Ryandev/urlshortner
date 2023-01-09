/* eslint-disable @typescript-eslint/no-namespace,
    @typescript-eslint/no-unused-vars, no-unused-vars, no-console */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare namespace Cypress {
    interface Chainable<Subject> {
        login(email: string, password: string): void;
    }
}

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    console.log('Custom command example: Login', email, password);
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { callback })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { callback })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { callback })

/* eslint-enable @typescript-eslint/no-namespace,
    @typescript-eslint/no-unused-vars, no-unused-vars, no-console */
