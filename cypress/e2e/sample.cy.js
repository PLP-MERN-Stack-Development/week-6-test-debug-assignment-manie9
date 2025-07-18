describe('Sample E2E Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    // Update the text below to match an element or text present on your homepage
    cy.contains('Bug Tracker');
  });
});
