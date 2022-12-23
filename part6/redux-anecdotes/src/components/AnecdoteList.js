import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const sortedAnecdotes = [...anecdotes].sort((a, b) => {
        if (a.votes < b.votes) return 1
        else if (a.votes > b.votes) return -1
        else return 0
    })

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }
  return (
    <>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList