// Module defines Establishing connection to the database
const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

const app = express()

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app





