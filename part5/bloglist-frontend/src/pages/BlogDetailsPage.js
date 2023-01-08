import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { likeBlog } from "../reducers/blogReducer"

const BlogDetailsPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const handleAddLike = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(blog.id, blogToUpdate))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {" "}
        {blog.title} {blog.author}{" "}
      </h2>
      <div> {blog.url} </div>
      <div>
        <span>Likes: {blog.likes}</span>
        <button onClick={handleAddLike}>like</button>
      </div>
      {blog.user && <div>Added by: {blog.user.name}</div>}
    </div>
  )
}

export default BlogDetailsPage
