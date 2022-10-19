import React from 'react'

const Notification = ({ message, type }) => {
  const successStyles = {
    color: 'green',
    border: 'solid green 3px',
    backgroundColor: 'rgb(211 211 211)',
    borderRadius: '3px',
    fontSize: '2rem',
    paddingLeft: '0.5em',
    marginBottom: '0.5em'
  }

  const errorStyles = {
    color: 'red',
    border: 'solid red 3px',
    backgroundColor: 'rgb(211 211 211)',
    borderRadius: '3px',
    fontSize: '2rem',
    paddingLeft: '0.5em',
    marginBottom: '0.5em'
  }

  return (
    <div style={type === 'success' ? successStyles : errorStyles}>
      {message}
    </div>
  )
}

export default Notification