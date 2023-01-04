import React from "react"
import { useState } from "react"

const CreateForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const createBlog = (event) => {
    event.preventDefault()

    handleCreateBlog(title, author, url)

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title
          <input
            id="title"
            type="text"
            name="Title"
            placeholder="blog title (required)"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            name="Author"
            placeholder="blog author (required)"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            id="url"
            type="text"
            name="Url"
            placeholder="blog url (required)"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create_blog_submit" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateForm
