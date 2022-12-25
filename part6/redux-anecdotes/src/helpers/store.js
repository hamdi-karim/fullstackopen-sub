import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from '../reducers/notificationReducer'
import anecdoteReducer from '../reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        anecdotes: anecdoteReducer
    }
  })

export default store

