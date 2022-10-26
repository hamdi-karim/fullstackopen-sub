
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors');

require('dotenv').config()
const Phonebook = require('./models/phonebook')

app.use(express.static('build'))

app.use(express.json())

app.use(cors())

morgan.token('body', (req) => {
  return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ' '
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebooks => {
    phonebookLength = phonebooks.length
    response.json(phonebooks)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(phonebook => {
    response.json(phonebook)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (!body.name) {
  //   return response.status(400).json({
  //     error: 'name is required'
  //   })
  // } else if (!body.number) {
  //   return response.status(400).json({
  //     error: 'number is required'
  //   })
  // }

  const phonebook =  new Phonebook({
    name: body.name,
    number: body.number,
  })

  phonebook.save()
    .then(newPerson => {
      response.json(newPerson)
    })
    .catch(error => {
      // this is the way to access the error message
      // console.log(error.response.data.error)
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findByIdAndUpdate(
    request.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
}) 

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get("/info", (request, response, next) => {
  Phonebook.find({})
    .then((people) => {
      response.send(`
      <p>Phonebook has info for ${people.length} people</p>
      <p>${new Date()}</p>
      `)
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})