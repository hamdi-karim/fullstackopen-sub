import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import CreateForm from './components/CreateForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      alert('Wrong Credentials')
      console.error(error)
    }
  } 

  const handleUserLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const updateBlogsAfterCreation = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type="text" 
              name="Username" 
              value={username} 
              onChange={({ target }) => setUsername(target.value)} 
            />
          </div>
          <div>
            password
            <input 
              type="password" 
              name="Password" 
              value={password} 
              onChange={({ target }) => setPassword(target.value)} 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> <i>{ user.name }</i> logged in <button onClick={handleUserLogout}>Logout</button></p>

      <CreateForm updateBlogsAfterCreation={ updateBlogsAfterCreation } />
      <br />
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App