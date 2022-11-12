import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm = ({ updateBlogsAfterCreation, handleCreateBlogSuccessfulOperation, handleCreateBlogFailureOperation }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const result = await blogService.createBlog({
                title,
                author,
                url
            })

            updateBlogsAfterCreation(result)
            setTitle('')
            setAuthor('')
            setUrl('')
            handleCreateBlogSuccessfulOperation(title, author)
            
        } catch (error) {
            handleCreateBlogFailureOperation(error.response.data.error)
        }
    }

  return (
    <div>
        <h2>Create new Blog</h2>
        <form onSubmit={handleCreateBlog}>
            <div>
                Title
                <input 
                    type="text" 
                    name="Title" 
                    value={ title }
                    onChange={({ target }) =>  setTitle(target.value)}
                />
            </div>
            <div>
                Author
                <input 
                    type="text" 
                    name="Author" 
                    value={ author }
                    onChange={({ target }) =>  setAuthor(target.value)}
                />
            </div>
            <div>
                Url
                <input 
                    type="text" 
                    name="Url" 
                    value={ url }
                    onChange={({ target }) =>  setUrl(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default CreateForm