import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successfulNotifMessage, setSuccessfulNotifMessage] = useState("")
  const [failedlNotifMessage, setFailedNotifMessage] = useState("")

  const blogFormRef = useRef()
  

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
      console.error(error)
      setFailedNotifMessage("Wrong username or password")
      setTimeout(() => {
        setFailedNotifMessage("")
      }, 4000)
    }
  } 

  const handleUserLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const updateBlogsAfterCreation = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(newBlog))
  }

  const handleCreateBlogSuccessfulOperation = (blogTitle, blogAuthor) => {
    setSuccessfulNotifMessage(`A new Blog : ${blogTitle} has been added by ${blogAuthor}`)
    setTimeout(() => {
      setSuccessfulNotifMessage('')
    }, 3000)
  }

  const handleCreateBlogFailureOperation = (error) => {
    setFailedNotifMessage(error)
    setTimeout(() => {
      setFailedNotifMessage('')
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {failedlNotifMessage && <Notification message={failedlNotifMessage} type="error" />}
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
      {successfulNotifMessage && <Notification message={successfulNotifMessage} type="success" />}
      {failedlNotifMessage && <Notification message={failedlNotifMessage} type="error" />}
      <p> <i>{ user.name }</i> logged in <button onClick={handleUserLogout}>Logout</button></p>

      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateForm 
          updateBlogsAfterCreation={updateBlogsAfterCreation} 
          handleCreateBlogSuccessfulOperation={handleCreateBlogSuccessfulOperation}
          handleCreateBlogFailureOperation={handleCreateBlogFailureOperation}
        />
      </Togglable>
      <br />
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App