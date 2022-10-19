import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(allPersonsData => {
        setPersons(allPersonsData)
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

    const newPersonObj = { name: newName, number: newNumber}

    personExists ? 
      alert(`${newName} is already added to the phonebook`) :
      
      personsService
        .createPerson(newPersonObj)
        .then(newPersonRes => {
          setPersons(persons.concat(newPersonRes))
        })

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