import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.some(person => person.name === newName)

    personExists ? 
      alert(`${newName} is already added to the phonebook`) :
        newName && newNumber ? 
        setPersons(persons.concat({
          name: newName,
          number: newNumber
        })) : 
          alert('Please fill out both name & number fields');
      

    setNewName('')
    setNewNumber('')
  }

  const filteredData = filterText === '' ? 
    persons :
      persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        filterText={filterText} 
        handleFilterChange={handleFilterChange} 
      />

      <h3>Add a new</h3>
      
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredData={filteredData} />
    </div>
  )
}

export default App