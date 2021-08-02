const { Section2 } = require('../objects/section-2')

describe('Problem 2', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('http://192.168.1.107:8080/section-2')
  })

  it('Waiting for Network Calls', () => {
    cy.get('[id=network-call-button]').click()
    cy.wait(11000)
    cy.request('http://localhost:8889/todos/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('body')
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
      expect(response).to.have.property('status')
    })

    cy.on('window:alert', (alertBox) => {
      expect(alertBox).to.contains('Abnormally long network call!')
    })
  })

  it('Browser API: Opening a new tab', () => {
    cy.get('[id=new-tab-button]').click()
    cy.url().should('include', 'http://192.168.1.107:8080/')
  })
})
