import React from 'react'
import Person from './Person'

const Persons = ({ filteredData }) => {
  return (
    <>
      { filteredData.map( data => <Person key={data.name} data={data} />) }
    </>
  )
}

export default Persons