import express from 'express'

const server = express();

server.use('/',(req,res) => {
    res.send("Modulo: Integrando node com banco de dados")
})

server.listen(3333)

