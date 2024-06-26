// require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Person = require('./model/person')

app.use(express.json())
app.use(express.static('dist'))
// app.use(cors())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findOneAndDelete({_id: id})
        .then(() => {
            res.status(204).end();
        })
});

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