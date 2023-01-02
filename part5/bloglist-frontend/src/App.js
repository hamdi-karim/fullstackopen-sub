import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import CreateForm from "./components/CreateForm"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"

import blogService from "./services/blogs"
import loginService from "./services/login"
import { editNotification, reset } from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
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
        username,
        password,
      })
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      notify(`Exception "${exception.response.data.error}"`, "alert")
    }
  }

  const handleUserLogout = () => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
  }

  const handleUpdateLikes = async (blogId, updateBlog) => {
    try {
      const res = await blogService.updateBlog(blogId, updateBlog)
      const newBlogs = blogs.map((blog) => (blog.id === blogId ? res : blog))
      setBlogs(newBlogs)
    } catch (exception) {
      notify(`Exception "${exception.response.data.error}"`, "alert")
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (exception) {
      notify(`Exception "${exception.response.data.error}"`, "alert")
    }
  }

  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.createBlog({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      notify(`A new Blog : ${title} has been added by ${author}`)
    } catch (exception) {
      notify(`Exception "${exception.response.data.error}"`, "alert")
    }
  }

  const notify = (message, type = "info") => {
    dispatch(editNotification({ message, type }))
    setTimeout(() => {
      dispatch(reset(null))
    }, 5000)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <p>
            {" "}
            <i>{user.name}</i> logged in{" "}
            <button onClick={handleUserLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <CreateForm createBlog={createBlog} />
          </Togglable>
          <br />

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdateLikes={handleUpdateLikes}
                handleDeleteBlog={handleDeleteBlog}
                userId={user.id}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
