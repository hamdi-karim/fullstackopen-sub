import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.some(person => person.name === newName)

    personExists ? 
      alert(`${newName} is already added to the phonebook`) :
      setPersons(persons.concat({
        name: newName
      }))
      
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <div key={person.name}>{person.name}</div> )}
    </div>
  )
}

export default App