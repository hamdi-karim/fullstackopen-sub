import { createSlice } from '@reduxjs/toolkit'

const initialState = null;

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    reset() {
      return null
    },
  },
})

export const { setNotification, reset } = notificationReducer.actions
export default notificationReducer.reducer