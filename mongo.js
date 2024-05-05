const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://frtavonatti:${password}@clusteragenda.btcobqt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAgenda`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Sigmund Freud',
  number: '999-999888777',
})

person.save().then(result => {
  console.log('contact saved!')
  mongoose.connection.close()
})