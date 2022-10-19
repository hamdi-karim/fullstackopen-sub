import React from 'react'

const Person = ({ data, handleDeletePerson }) => {
  return (
    <div>{data.name} {data.number} <button onClick={handleDeletePerson}>delete</button> </div>
  )
}

export default Person