const mongoose = require('mongoose')

const url = `mongodb+srv://fullstack-phonebook:kh22661356@cluster0.mu1uoad.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    if (process.argv.length === 3) {
      Phonebook.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(phonebook => {
          console.log(`${phonebook.name} ${phonebook.number}`)
        })

        mongoose.connection.close()
      })
    } else {
      const phonebook = new Phonebook({
        name: process.argv[3],
        number: process.argv[4],
      })

      return phonebook.save().then(result => {
        console.log(`added ${result.name} to phonebook`)
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))

