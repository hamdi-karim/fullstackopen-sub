import { useRef } from "react"
import { useDispatch } from "react-redux"

import Togglable from "../components/Togglable"
import CreateForm from "../components/CreateForm"
import Blogs from "../components/Blogs"

import { createBlog } from "../reducers/blogReducer"
import notificationService from "../services/notification"

const Home = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleCreateBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({ title, author, url }))
    notificationService.notify(`A new Blog : ${title} has been added by ${author}`)
  }
  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <br />
      <Blogs />
    </div>
  )
}

export default Home
