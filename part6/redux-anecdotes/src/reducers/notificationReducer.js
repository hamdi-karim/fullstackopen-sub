import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Initial Message from reducer';

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.message
    }
  },
})

export const { notificationChange } = notificationReducer.actions
export default notificationReducer.reducer