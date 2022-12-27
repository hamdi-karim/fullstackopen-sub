import { createSlice } from '@reduxjs/toolkit'

const initialState = null;

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    EditNotification(state, action) {
      return action.payload
    },
    reset() {
      return null
    },
  },
})

export const { EditNotification, reset } = notificationReducer.actions

var timeoutId = null

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(EditNotification(text))

    if(timeoutId){
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    
    timeoutId = setTimeout(() => {
      dispatch(reset())
    }, seconds * 1000)
  };
};



export default notificationReducer.reducer