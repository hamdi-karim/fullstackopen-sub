import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    editNotification(state, action) {
      return action.payload
    },
    reset() {
      return null
    },
  },
})

export const { editNotification, reset } = notificationReducer.actions
export default notificationReducer.reducer
