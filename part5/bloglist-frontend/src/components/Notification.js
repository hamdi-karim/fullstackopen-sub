import React from 'react'

const Notification = ({ message, type }) => {

  const successStyles = {
    border: '3px solid green',
    backgroundColor: 'rgb(126 135 130 / 12%)',
    bodShadow: '0 0 2px #259c08',
    color: 'green',
    padding: '1em',
    fontSize: '1.2rem'
  }

  const failureStyles = {
    border: '3px solid red',
    backgroundColor: 'rgb(126 135 130 / 12%)',
    bodShadow: '0 0 2px #259c08',
    color: 'red',
    padding: '1em',
    fontSize: '1.2rem'
  }

  return (
    <p style={type === 'success' ? successStyles : failureStyles}>
        { message }
    </p>
  )
}

export default Notification