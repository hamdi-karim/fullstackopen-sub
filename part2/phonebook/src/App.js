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

    const newPersonObj = { name: newName, number: newNumber}

    const personExistsObj = persons.find(p => p.name === newPersonObj.name)

    if (!personExistsObj) {
      personsService
      .createPerson(newPersonObj)
      .then(newPersonRes => {
        setPersons(persons.concat(newPersonRes))
        setCreatePhonebookSuccessMessage(`Added ${newPersonObj.name}`)
        setTimeout(() => {
          setCreatePhonebookSuccessMessage('')
        }, 4000)

        setNewName('')
        setNewNumber('')
      })
      .catch(err =>  {
        setCreatePhonebookFailureMessage(err.response.data.error)
        setTimeout(() => {
          setCreatePhonebookFailureMessage('')
        }, 4000)
      })

    } else {
      personsService.updatePerson(personExistsObj.id, newPersonObj)
        .then(UpdatedPersonRes => {
          setPersons(persons.map(p => p.id !== personExistsObj.id ? p : UpdatedPersonRes))
          setCreatePhonebookSuccessMessage(`The number of ${newPersonObj.name} has been successfully updated`)
          setTimeout(() => {
            setCreatePhonebookSuccessMessage('')
          }, 4000)

          setNewName('')
          setNewNumber('')
        })
        .catch(err =>  {
          setCreatePhonebookFailureMessage('Update failed')
          setTimeout(() => {
            setCreatePhonebookFailureMessage('')
          }, 4000)
        })
    }

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