describe('frontend-index', () => {
    beforeEach(() => cy.visit('/'));

    it('should display welcome message', () => {
        cy.get('h2').should('have.length', 1);
        cy.get('h2 > span').should('have.length', 2);

        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get('h2')
            .invoke('text')
            .then(text => {
                expect(text.trim()).equal('URLShortner');
            });
    });
});
