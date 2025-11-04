import express from 'express';
import dotenv from 'dotenv';
import { MainRouter } from '../routes/index.js';
dotenv.config();

const server = express();
const PORT = process.env.PORT;
server.use(express.json())

server.use(MainRouter)
server.listen(PORT,() => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
});

