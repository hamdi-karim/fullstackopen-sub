import React from 'react'
import { useState } from 'react'

const CreateForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    createBlog(title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            type='text'
            name='Title'
            placeholder='blog title (required)'
            value={ title }
            onChange={({ target }) =>  setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type='text'
            name='Author'
            placeholder='blog author (required)'
            value={ author }
            onChange={({ target }) =>  setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type='text'
            name='Url'
            placeholder='blog url (required)'
            value={ url }
            onChange={({ target }) =>  setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateForm