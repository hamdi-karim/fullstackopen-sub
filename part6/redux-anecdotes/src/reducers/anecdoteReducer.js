import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateAnecdote } from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { vote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await updateAnecdote(anecdote);
    dispatch(vote(votedAnecdote));
  };
};

export default anecdotesSlice.reducer