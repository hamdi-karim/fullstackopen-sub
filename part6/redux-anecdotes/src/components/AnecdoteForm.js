import { useDispatch } from 'react-redux'
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { createNew } from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm