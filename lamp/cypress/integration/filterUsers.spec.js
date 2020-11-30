it("loads", () => {
    const baseUrl = "http://localhost:80/fakeid/lamp";
    cy.visit(baseUrl);
    cy.contains("FakeID");
  });
  
  /**
   * test show hide click
   * test results for all params are correct
   */

  describe("click on show filters and show all filters", () => {
    it("show filters", () => {
      cy.get(".filterBtn").click();

      cy.get('.filtersContainer').should('be.visible');
    });
  });

  describe("click on show filters and filter based on gender", () => {
    it("show male users", () => {
      
      cy.get('label[for=male]').click();

      cy.get('.singleUser').contains('Male');
      cy.get('.singleUser').should('not.have', 'Female');
    });
});

  describe("click on show filters and filter based on employment", () => {
    it("show no employees", () => {
      
      cy.get('label[for=employee]').click();
      cy.get('.singleUser').should('not.have', '12345678');
    });
});

  describe("click employee and child filters and show no user", () => {
    it("show no users", () => {
      
      cy.get('label[for=child]').click();

      cy.get('.singleUser').should('not.exist');
    });
});

  describe("click both gender filters and show all users", () => {
    it("show all users", () => {
      
      cy.get('label[for=employee]').click();
      cy.get('label[for=child]').click();
      cy.get('label[for=female]').click();

      cy.get('.singleUser').contains('Female');
      cy.get('.singleUser').contains('Male');
    });
});


// describe("Click on random filters and check result", () => {
//     it('show correct filtering', () => {

//         cy.get(".labelRadio label").eq(Math.floor(Math.random()*5)).click()
//         cy.get(".labelRadio label").eq(Math.floor(Math.random()*5)).click()
//         cy.get(".labelRadio label").eq(Math.floor(Math.random()*5)).click()
//         cy.get(".labelRadio label").eq(Math.floor(Math.random()*5)).click()

//         cy.get('.container').should('be.visible')
//         cy.get('.container').contains('Log in')
//     })
// })

  /*and as for cypress - write a test which select all the filters, 
  then unselect few in random order, then search names in results and eventually sort alphabetically, 
  for example */