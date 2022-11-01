const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})

  response.json(result)
})

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

module.exports = blogsRouter