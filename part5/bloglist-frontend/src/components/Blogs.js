import { useSelector } from "react-redux"
import Blog from "./Blog"

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
    </div>
  )
}

export default Blogs
