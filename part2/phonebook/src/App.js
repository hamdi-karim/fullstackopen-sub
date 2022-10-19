import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [createPhonebookSuccessMessage, setCreatePhonebookSuccessMessage] = useState('')
  const [createPhonebookFailureMessage, setCreatePhonebookFailureMessage] = useState('')

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

  const handleDeletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
      .deletePerson(id)
      .then( () => {
        const filteredPersons = persons.filter(person => person.id !== id)
        
        setPersons(filteredPersons)
      } )
    }
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name === newName)

    const newPersonObj = { name: newName, number: newNumber}

    if (personExists) {
      if (window.confirm(`${personExists.name} is already added to the phonebook, replace the old number with a new one?`)) {
          personsService
            .updatePerson(personExists.id, newPersonObj)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== personExists.id ? person : updatedPerson))
              setCreatePhonebookSuccessMessage(`${newPersonObj.name}'s number updated with ${newPersonObj.number}`)
              setTimeout(() => {
                setCreatePhonebookSuccessMessage('')
              }, 4000)
            })
            .catch(error => {
              setCreatePhonebookFailureMessage(
                `Information of '${newPersonObj.name}' was already deleted from server`
              )
              setPersons(persons.filter(p => p.id !== personExists.id))
              setTimeout(() => {
                setCreatePhonebookFailureMessage('')
              }, 4000)
            })

          
          
        }
    } else {
      personsService
        .createPerson(newPersonObj)
        .then(newPersonRes => {
          setPersons(persons.concat(newPersonRes))
        })

        setCreatePhonebookSuccessMessage(`Added ${newPersonObj.name}`)
        setTimeout(() => {
          setCreatePhonebookSuccessMessage('')
        }, 4000)
    }
      
    setNewName('')
    setNewNumber('')
  }

  const filteredData = filterText === '' ? 
    persons :
      persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      {createPhonebookSuccessMessage && <Notification message={createPhonebookSuccessMessage} type="success" />}
      {createPhonebookFailureMessage && <Notification message={createPhonebookFailureMessage} type="error" />}

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
      <Persons 
        filteredData={filteredData} 
        handleDeletePerson={handleDeletePerson} 
      />
    </div>
  )
}

export default App