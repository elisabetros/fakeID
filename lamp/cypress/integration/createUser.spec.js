it('finds the content "type"', () => {
  cy.visit("localhost:80/fakeid/lamp/create.php");

  cy.contains("FakeID");
});

describe("Create an employee user", () => {
  let user = {
    name: "Martina RoRoRo",
    dateOfBirth: "021065",
    address_id: 1,
    genderValue: "0002",
    isEmployee: true,
    // profileAddressId: 2,
    // description: `Martin Rhode description`
  };

  it("type in new employee details", () => {
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="date_of_birth"]').type(user.dateOfBirth);
    cy.get('select[name="address_id"]').select(
      user.address_id == 2 ? "Lygten 37" : "Lygten 17"
    );
    // cy.get('input[name="gender_value"]').check(user.genderValue);
    if (user.genderValue == "0002") {
      cy.get("label").contains("Female").click();
    } else {
      cy.get("label").contains("Male").click();
    }

    if (user.isEmployee == false) {
      cy.get("label").contains("Not Employee").click();
    } else {
      cy.get("label").contains("Is Employee").click();
    }

    // cy.get('input[name="isEmployee"]').check(user.isEmployee);
    cy.get('input[type="submit"]').click();
  });

  it("makes sure new user is created", () => {
    cy.visit("localhost:80/fakeid/lamp/");
    cy.contains(user.name);
  });
});
