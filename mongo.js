const mongoose = require('mongoose')

const password = process.argv[2] 
const newName = process.argv[3]
const newNumber = process.argv[4]

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

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
  name: newName,
  number: newNumber,
})

const getData = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      });
} 

const saveData = () => {
    person.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
      })
}

if (process.argv.length === 3) {
    getData()
} else {
    saveData()
}
