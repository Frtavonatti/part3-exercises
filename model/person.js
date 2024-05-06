require('dotenv').config()
const mongoose = require('mongoose')

// const password = process.argv[2] 
// const newName = process.argv[3]
// const newNumber = process.argv[4]

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const url =
//   `mongodb+srv://frtavonatti:${password}@clusteragenda.btcobqt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAgenda`

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to' + url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: newName,
//   number: newNumber,
// })