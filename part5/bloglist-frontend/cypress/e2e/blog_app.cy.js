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
      -       cy.get('#username').type('testkhgdwb')
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

    describe('and some blogs exist', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Karim1', url: 'www.firstblog.io'  })
        cy.createBlog({ title: 'second blog', author: 'Karim2', url: 'www.secondblog.io'  })
        cy.createBlog({ title: 'third blog', author: 'Karim3', url: 'www.thirdblog.io'  })
      })

      it('A user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('Likes:').contains('0')

        cy.contains('like').click()
        cy.contains('Likes:').contains('1')
      })

      it('A user owner of the blog can delete it', function() {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'second blog')
      })

      it('Blogs are ordered by Number if Likes (ASC)', function() {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('like').click().wait(250).click().wait(250).click().wait(250)
        cy.contains('second blog').parent().find('button').click()

        cy.contains('third blog').parent().find('button').click()
        cy.contains('like').click().wait(250).click().wait(250)
        cy.contains('second blog').parent().find('button').click()

        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
      })
    })

  })
})