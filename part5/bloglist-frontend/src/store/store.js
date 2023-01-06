import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "../reducers/notificationReducer"
import blogReducer from "../reducers/blogReducer"
import usersReducer from "../reducers/usersReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
})

export default store
