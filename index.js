require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./model/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
// app.use(morgan('tiny'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.get('/', (req, res) => {
//     res.send('<h1>Mi first server</h1>')
// })

// app.get('/info', (req, res) => {
//     res.send(`<h2> Phonebook has info for ${persons.length} people </h2>
//     <p> ${new Date().toString()} </p>`)
// })

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
      })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    })
})

// app.delete('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     person.filter(person => person.id !== id)

//     res.status(204).end()
// }) 

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400)
            .json({ error: 'Nombre y número son campos requeridos.' });
    } 
    
    // if (persons.some(person => person.name === body.name)) {
    //     return res.status(400)
    //         .json({ error: 'Ya existe una persona con este nombre.' });
    // }

    const newPerson = new Person ({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
      })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on' + PORT)
})