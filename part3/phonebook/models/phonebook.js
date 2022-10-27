/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const numberValidation = [
  {
    // Length Validator
    validator: (number) => {
      if (
        ((number[2] === '-' || number[3] === '-') && number.length < 9) ||
        number.length < 8
      ) {
        return false;
      }
      return true;
    },
    msg: 'Number must be at least 8 digits',
  },
  {
    // Numbers Validator
    validator: (number) => /^\d{2,3}-\d+$/.test(number) || /^\d+$/.test(number),
    msg: 'Invalid Number Format',
  },
];

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  number: {
    type: String,
    required: true,
    validate: numberValidation,
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Phonebook', phonebookSchema);
