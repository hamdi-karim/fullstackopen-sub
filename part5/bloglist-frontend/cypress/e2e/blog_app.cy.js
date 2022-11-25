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
        cy.get('#username').type('testkhgdwb')
        cy.get('#password').type('hamdi')
        cy.get('#login-button').click()

        cy.contains('KarimTest logged in')
      })
  
      it('fails with wrong credentials', function() {
-        cy.get('#username').type('testkhgdwb')
        cy.get('#password').type('wrongwhy?')
        cy.get('#login-button').click()

        cy.contains('Wrong username or password')
        cy.get('.notif').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.notif').should('have.css', 'border-color', 'rgb(255, 0, 0)')
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'testkhgdwb', password: 'hamdi' })
      })
  
      it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.contains('Create new blog')

        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('www.testurl.io')
        cy.get('#create_blog_submit').click()

        cy.contains('test blog')
        cy.contains('test author')
      })
    })

  })