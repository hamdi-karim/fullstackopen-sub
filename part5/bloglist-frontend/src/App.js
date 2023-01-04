import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import CreateForm from "./components/CreateForm"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"

import blogService from "./services/blogs"
import loginService from "./services/login"
import { editNotification, reset } from "./reducers/notificationReducer"
import {
  initializeBlogs,
  setBlogs,
  createBlog,
  deleteBlog,
} from "./reducers/blogReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

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
      dispatch(setBlogs(newBlogs))
    } catch (exception) {
      notify(`Exception "${exception.response.data.error}"`, "alert")
    }
  }

  const handleDeleteBlog = async (blogId) => {
    dispatch(deleteBlog(blogId))
  }

  const handleCreateBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({ title, author, url }))
    notify(`A new Blog : ${title} has been added by ${author}`)
    // notify(`Exception "${exception.response.data.error}"`, "alert")
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
            <CreateForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <br />

          {blogs
            .slice()
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
