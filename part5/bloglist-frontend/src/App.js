import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"

import blogService from "./services/blogs"
import loginService from "./services/login"
import { editNotification, reset } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"

import UsersPage from "./pages/UsersPage"
import UserDetailsPage from "./pages/UserDetailsPage"

import Home from "./pages/HomePage"
import BlogDetailsPage from "./pages/BlogDetailsPage"

const padding = {
  padding: 5,
}

const backgroundColor = {
  backgroundColor: "#d3d3d3",
}

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

  const notify = (message, type = "info") => {
    dispatch(editNotification({ message, type }))
    setTimeout(() => {
      dispatch(reset(null))
    }, 5000)
  }

  if (!user) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  return (
    <>
      <Router>
        <div style={backgroundColor}>
          <Link style={padding} to="/">
            Blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <i>{user.name}</i> logged in{" "}
          <button onClick={handleUserLogout}>Logout</button>
        </div>

        <h2>Blogs</h2>
        <Notification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage users={users} />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
