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
    const {email, password} = req.body
    db.run('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if(err){
            res.status(500).send('error del servidor')
        }else if(!user){
            res.status(404).send('usuario no encontrado')
        }else if(user.password == password){
            res.status(200).send(user)
        }else{
            res.send
        }
    })
})

const server = createServer(app)
server.listen(port, () => {
console.log(`su puerto es: ${port}`)
})