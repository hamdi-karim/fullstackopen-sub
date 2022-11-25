describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'KarimTest',
        username: 'testkhgdwb',
        password: 'hamdi'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Blogs')
      cy.contains('Login')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        // ...
        cy.get('#username').type('testkhgdwb')
        cy.get('#password').type('hamdi')
        cy.get('#login-button').click()

        cy.contains('KarimTest logged in')
      })
  
      it('fails with wrong credentials', function() {
        // ...
        cy.get('#username').type('testkhgdwb')
        cy.get('#password').type('wrongwhy?')
        cy.get('#login-button').click()

        cy.contains('Wrong username or password')
        cy.get('.notif').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.notif').should('have.css', 'border-color', 'rgb(255, 0, 0)')
      })
    })
  })