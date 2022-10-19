import React from 'react'
import Person from './Person'

const Persons = ({ filteredData, handleDeletePerson }) => {

  if (filteredData.length === 0) {
    return <div>Loading Content ...</div>
  }

  return (
    <>
      { filteredData.map( 
          data => 
            <Person 
              key={data.name} 
              data={data} 
              handleDeletePerson={() => handleDeletePerson(data.id)} 
            />
        ) 
      }
    </>
  )
}

export default Persons