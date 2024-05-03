const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
// app.use(morgan('tiny'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const { v4: uuidv4 } = require('uuid');

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

app.get('/', (req, res) => {
    res.send('<h1>Mi first server</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<h2> Phonebook has info for ${persons.length} people </h2>
    <p> ${new Date().toString()} </p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id) 
    const person = persons.find(person => person.id === id)

    person 
    ? res.json(person)
    : res.status(404)
        .send("Person does not exist")
        .end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
}) 

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400)
            .json({ error: 'Nombre y número son campos requeridos.' });
    } 
    
    if (persons.some(person => person.name === body.name)) {
        return res.status(400)
            .json({ error: 'Ya existe una persona con este nombre.' });
    }

    const newPerson = {
        // id: uuidv4(),
        id: Math.floor(Math.random() * (100 - 1) + 1),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on' + PORT)
})