const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 4) {
  console.log('Please provide A number to be added to the phonebook')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack-phonebook:${password}@cluster0.mu1uoad.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
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

