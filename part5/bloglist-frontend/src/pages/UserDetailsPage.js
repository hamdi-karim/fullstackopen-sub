import { useParams } from "react-router-dom"

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}> {blog.title} </li>
        })}
      </ul>
    </div>
  )
}

export default User
