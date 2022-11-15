import { useState } from "react"

const Blog = ({ blog, handleUpdateLikes }) => {

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
      user: blog.user?.id || null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    handleUpdateLikes(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={() => setShowDetails(!showDetails)}>{ showDetails ? 'hide' : 'view' }</button></div> 
      { showDetails && (
        <>
          <div>{ blog.url }</div>
          <div>{ blog.likes } <button onClick={handleAddLike}>like</button></div>
          <div>{ blog.author }</div>
        </>
      ) }
      
    </div>  
  )
}

export default Blog