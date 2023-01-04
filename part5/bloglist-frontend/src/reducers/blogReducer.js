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
  },
})

export const { setBlogs, appendBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newAnecdote = await blogService.createBlog(content)
    dispatch(appendBlog(newAnecdote))
  }
}

export default blogsSlice.reducer
