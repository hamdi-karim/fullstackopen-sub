import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createComment } from "../reducers/blogReducer"

const Comments = () => {
  const [commentText, setCommentText] = useState("")

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!commentText.trim()) return
    dispatch(createComment(blog.id, commentText.trim()))
    setCommentText("")
  }

  const handleCommentChange = (event) => {
    setCommentText(event.target.value)
  }
  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="commentText"
            value={commentText}
            onChange={handleCommentChange}
          />
          <button id="addComment-button" type="submit">
            Add comment
          </button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments
