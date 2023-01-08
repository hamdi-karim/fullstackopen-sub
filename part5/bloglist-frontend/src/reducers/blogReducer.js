import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    putBlog(state, action) {
      const { id } = action.payload
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, removeBlog, putBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateBlog(id, blog)
    dispatch(putBlog(likedBlog))
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.addComment(id, comment)
    dispatch(putBlog(commentedBlog))
  }
}

export default blogsSlice.reducer
