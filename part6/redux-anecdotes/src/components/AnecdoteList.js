import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, reset } from '../reducers/notificationReducer'
import Notification from './Notification';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const notificationMessage = useSelector(state => state.notification)

    const dispatch = useDispatch()

    const sortedAnecdotes = [...anecdotes].sort((a, b) => {
        if (a.votes < b.votes) return 1
        else if (a.votes > b.votes) return -1
        else return 0
    })

    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`You voted '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
    }

  return (
    <>
        {notificationMessage && <Notification />}
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList