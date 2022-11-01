const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})

  response.json(result)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const note = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const newBlog = request.body
  const id = request.params.id

  const updatedResult = await Blog.findByIdAndUpdate(id, newBlog, { new: true })

  updatedResult
  ? response.status(200).json(updatedResult.toJSON())
  : response.status(404).end()
})

module.exports = blogsRouter