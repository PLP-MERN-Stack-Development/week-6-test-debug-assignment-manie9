describe('MERN Bug Tracker End-to-End Tests', () => {
  beforeEach(() => {
    cy.request('POST', '/api/bugs/reset-test-db'); // Assuming an endpoint to reset test DB
  });

  it('should create a new bug', () => {
    cy.visit('/');
    cy.get('input[name="title"]').type('Test Bug');
    cy.get('textarea[name="description"]').type('Bug description');
    cy.get('select[name="status"]').select('open');
    cy.get('select[name="priority"]').select('high');
    cy.get('button[type="submit"]').click();
    cy.contains('Test Bug').should('exist');
  });

  it('should update a bug status', () => {
    cy.visit('/');
    cy.contains('Test Bug').click();
    cy.get('select[name="status"]').select('closed');
    cy.get('button[type="submit"]').click();
    cy.contains('closed').should('exist');
  });

  it('should delete a bug', () => {
    cy.visit('/');
    cy.contains('Test Bug').parent().find('button.delete').click();
    cy.contains('Test Bug').should('not.exist');
  });
});
