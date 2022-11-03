const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
blogsRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  response.json(result)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const token = request.token
  
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  }).populate("user", { username: 1, name: 1 })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
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