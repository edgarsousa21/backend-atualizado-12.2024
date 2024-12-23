import express from "express";
import cors from "cors"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())

const port = 3000

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()


    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })


    res.status(201).json({ user })
})

app.put('/usuarios/:id', async (req, res) => {

    req.params.id

    const user = await prisma.user.update({

        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })


    res.status(200).json({ user })
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário Deletado com Sucesso" })

})

app.listen(port, () => {
    console.log(`🚀 Server Started On Port: ${port} 🚀`)
})









/*
req - requisição
res - resposta
http://localhost:3000

MONGODB:

edgarraphaeldesousa

ulcRbXeRshYf8ahX

*/



















/*
app.listen(port, () => {
  console.log(`🍔 Server Started On Port: ${port} 🍔`)
})

*/

