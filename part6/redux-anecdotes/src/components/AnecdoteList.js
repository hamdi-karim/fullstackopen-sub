import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification';

const AnecdoteList = () => {
    const filterText = useSelector(state => state.filter)
    const notificationMessage = useSelector(state => state.notification)
    const anecdotes = useSelector(state => state.anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(filterText.toLowerCase())
    ))
          
    const dispatch = useDispatch()

    const sortedAnecdotes = [...anecdotes].sort((a, b) => {
        if (a.votes < b.votes) return 1
        else if (a.votes > b.votes) return -1
        else return 0
    })

    const vote = (anecdote) => {
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
      dispatch(voteAnecdote(anecdote))
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