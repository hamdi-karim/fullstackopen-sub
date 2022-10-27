const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Phonebook = require('./models/phonebook');
require('dotenv').config();

const app = express();

app.use(express.static('build'));

app.use(express.json());

app.use(cors());

morgan.token('body', (req) =>
  Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ' '
);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((phonebooks) => {
    response.json(phonebooks);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then((phonebook) => {
    response.json(phonebook);
  });
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  Phonebook.find({})
    .then((people) => {
      const exists = people.findIndex((p) => p.name === body.name);
      if (exists !== -1) {
        response.status(400).send({ error: 'Name already Exists' });
      } else {
        const phonebook = new Phonebook({
          name: body.name,
          number: body.number,
        });
        phonebook
          .save()
          .then((newPerson) => {
            response.json(newPerson);
          })
          .catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Phonebook.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response, next) => {
  Phonebook.find({})
    .then((people) => {
      response.send(`
      <p>Phonebook has info for ${people.length} people</p>
      <p>${new Date()}</p>
      `);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
  return 0;
};

app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
