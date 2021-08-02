const { Section1 } = require('../objects/section-1')

describe('Problem 1', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('http://192.168.1.107:8080/section-1')
  })

  it('DOM Tables', () => {
    // Test1 - Assert that the table is not visible
    cy.get('[id=alaya-table]').should('not.be.visible')

    // Test2 - After clicking the "Show table" button, assert the table is visible
    cy.get('[id=table-toggle-button]').click()
    cy.get('[id=alaya-table]').should('be.visible')

    // Test3 - Assert that the table is 5 columns wide
    cy.get('[data-test=table-header]').find('th').should('have.length', 5)

    // Test4 - Assert that the table is 10 rows long, excluding the first (header) row
    cy.get('[id=alaya-table]').find('tr').eq(10)
    const givenRowLength = 10

    cy.get('[id=alaya-table]').find('tr').should('have.length', (givenRowLength + 1))

    // Test5 - Assert that at least 5 entries have the role user
    let count = 0

    cy.get('[id=alaya-table]')
      .find('tr')
      .then((rows) => {
        rows.toArray().forEach((element) => {
          if (element.innerHTML.includes('user')) {
            count += 1
          }
        })

        cy.log(count)
        expect(count).to.be.at.least(5)
      })
  })

  it('DOM Forms', () => {
    // Test1 - Assert that the form is not visible
    cy.get('[id=alaya-form]').should('not.be.visible')

    // Test2 - After clicking the "Show form" button, assert that the form is visible
    cy.get('[id=form-toggle-button]').click()
    cy.get('[id=alaya-form]').should('be.visible')

    // Test3 - Fill in the "Name" and "Age" inputs, and assert that both inputs are filled
    cy.get('[id=fullName]').type('Sam')
    cy.get('[id=fullName]').should('have.value', 'Sam')
    cy.get('[id=age]').type('26')
    cy.get('[id=age]').should('have.value', '26')

    // Test4 - Select "Female" from the select option, and assert that the value is "female"
    cy.get('[id=gender]').select('Female')
    cy.get('[id=gender]').should('have.value', 'female')

    // Test5 - Tick the "Nurse" checkbox and assert that the value "nurse" is true
    cy.get('[id=nurse]').check()
    cy.get('[id=nurse]').should('be.checked')

    // Test6 - Click on the "Submit" button and assert that there is an alert window showing with the text "Form submitted!"
    cy.get('[id=submit]').click()
    cy.on('window:alert', (alertBox) => {
      expect(alertBox).to.contains('Form submitted!')
    })
  })
})
