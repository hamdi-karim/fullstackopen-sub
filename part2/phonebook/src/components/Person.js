import React from 'react'

const Person = ({ data }) => {
  return (
    <div>{data.name} {data.number}</div>
  )
}

export default Person