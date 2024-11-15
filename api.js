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
    const { userName, password } = req.body
    console.log(req.body)
    db.get('SELECT * FROM users WHERE userName = ?', [userName], (err, user) => {
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

app.patch('/api/changePassword', (req, res) => {

    const {newLastPass, newPassword, userId} = req.body

    db.run('UPDATE users SET password = ?, lastPass = ? WHERE id = ?', [newPassword, newLastPass, userId], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('Contraseña cambiada con exito')
        }
    })
})

app.post('/api/createUser', (req, res) => {
    const { id, name, address, phone, email, birthDate, password, type, userName, lastPass } = req.body
    console.log(req.body)
    db.run('INSERT INTO users(id, name, userName, address, phone, email, birthDate, password, lastPass, type) VALUES(? ,? ,? ,? ,? ,? ,?, ?, ?, ?)', [id, name, userName, address, phone, email, birthDate, password, lastPass, type], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('registro exitoso')
        }
    })
})

app.post('/api/createDoctor', (req, res) => {
    const { id, name, address, phone, email, birthDate, password, type, specialty, userName, lastPass } = req.body
    console.log(req.body)
    db.run('INSERT INTO users(id, name, userName, address, phone, email, birthDate, password, lastPass, type, specialty) VALUES(? ,? ,? ,? ,? ,? ,?, ?, ?, ?, ?)', [id, name, userName, address, phone, email, birthDate, password, lastPass, type, specialty], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('registro exitoso')
        }
    })
})

app.get('/api/getDoctors', (req, res) => {
    db.all('SELECT users.name, users.id, specialties.name AS specialtyName, specialties.id AS specialtyId FROM users INNER JOIN specialties ON users.specialty = specialties.id WHERE users.type == 1', (err, list) => {
        if(err){
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(list)
        }
    })
})

app.post('/api/makeDate', (req, res) => {
    const {time, date, doctorId, patientId} = req.body
    console.log(req.body)
    db.run('INSERT INTO dates(time, date, patientId, doctorId) VALUES(?, ?, ?, ?)', [time, date, patientId, doctorId], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('Cita registrada con exito')
        }
    })
})

app.post('/api/getPatientDates', (req, res) => {
    const { patientId } = req.body
    console.log(patientId)
    db.all(`
        SELECT dates.date, dates.time, dates.id as dateId, users.specialty, users.name AS doctorName FROM dates JOIN users ON dates.doctorId = users.id WHERE dates.patientId = ?
        `, [patientId], (err, list) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(list)
        }
    })
})

const server = createServer(app)
server.listen(port, () => {
console.log(`su puerto es: ${port}`)
})