const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors');

app.use(express.json())

app.use(cors())

morgan.token('body', (req) => {
  return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ' '
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  return Math.floor(Math.random() * 4000+10)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const newId = generateId()

  if (!body.name) {
    return response.status(400).json({
      error: 'name is required'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is required'
    })
  }

  const nameExists = persons.some(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const phonebookCount = persons.length
  const date = new Date()

  response.send(`
  <p>Phonebook has info for ${phonebookCount} people</p>
  <p>${date}</p>
  `)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})