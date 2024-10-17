import express from "express";
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { createServer } from 'http'

const app = express()
const port = 3000

const db = new sqlite3.Database('db.db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/api/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else if(!user){
            res.status(401).send('usuario no encontrado')
        }else if(user.password == password){
            res.status(200).send(user)
        }else{
            res.status(403).send('Contraseña incorrecta')
        }
    })
})

app.post('/api/createUser', (req, res) => {
    const { id, name, address, phone, email, birthDate, password, type } = req.body
    console.log(req.body)
    db.run('INSERT INTO users(id, name, address, phone, email, birthDate, password, type) VALUES(? ,? ,? ,? ,? ,? ,?, ?)', [id, name, address, phone, email, birthDate, password, type], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('registro exitoso')
        }
    })
})

app.post('/api/createDoctor', (req, res) => {
    const { id, name, address, phone, email, birthDate, password, type, specialty } = req.body
    console.log(req.body)
    db.run('INSERT INTO users(id, name, address, phone, email, birthDate, password, type, specialty) VALUES(? ,? ,? ,? ,? ,? ,?, ?, ?)', [id, name, address, phone, email, birthDate, password, type, specialty], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('registro exitoso')
        }
    })
})

app.post('/api/createSpecialty', (req, res) => {
    const { name } = req.body
    db.run('INSERT INTO specialties(name) VALUES(?)', [name], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('Especialidad agregada')
        }
    })
})

const server = createServer(app)
server.listen(port, () => {
console.log(`su puerto es: ${port}`)
})