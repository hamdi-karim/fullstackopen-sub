import { useState } from 'react'

const Blog = ({
  blog,
  handleUpdateLikes,
  handleDeleteBlog,
  userId
}) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleAddLike = () => {
    const updatedBlog = {
      user: blog.user ? blog.user.id : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    handleUpdateLikes(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete Blog : ${blog.title} ?`)) {
      handleDeleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>{' '}
        <button onClick={() => setShowDetails(!showDetails)}>{ showDetails ? 'hide' : 'view' }</button>
      </div>
      { showDetails && (
        <>
          <div>{ blog.url }</div>
          <div>{ blog.likes } <button onClick={handleAddLike}>like</button></div>
          {(blog.user ? userId === blog.user.id : userId === blog.user) && <button onClick={deleteBlog}>remove</button>}
        </>
      ) }

    </div>
  )
}

export default Blog