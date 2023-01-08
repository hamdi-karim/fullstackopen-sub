import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"

import blogService from "./services/blogs"
import loginService from "./services/login"
import { editNotification, reset } from "./reducers/notificationReducer"
import { initializeBlogs /*, setBlogs, deleteBlog*/ } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"

import UsersPage from "./pages/UsersPage"
import UserDetailsPage from "./pages/UserDetailsPage"

import Home from "./pages/HomePage"
import BlogDetailsPage from "./pages/BlogDetailsPage"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

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
    dispatch(initializeUsers())
  }, [dispatch])

  // const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

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

  //TODO: move to BlogDetailsPage
  // const handleUpdateLikes = async (blogId, updateBlog) => {
  //   try {
  //     const res = await blogService.updateBlog(blogId, updateBlog)
  //     const newBlogs = blogs.map((blog) => (blog.id === blogId ? res : blog))
  //     dispatch(setBlogs(newBlogs))
  //   } catch (exception) {
  //     notify(`Exception "${exception.response.data.error}"`, "alert")
  //   }
  // }

  // const handleDeleteBlog = async (blogId) => {
  //   dispatch(deleteBlog(blogId))
  // }

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

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserDetailsPage users={users} />} />
              <Route path="/blogs/:id" element={<BlogDetailsPage />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  )
}

export default App
