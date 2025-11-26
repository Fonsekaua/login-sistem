import express from 'express';
import dotenv from 'dotenv';
import { App } from '../routes/index.js';

import passport from 'passport';
import { localStrategy } from '../libs/PassportLocal/index.js';
import { jwtStrategy } from '../libs/PassportJwt/index.js';
dotenv.config();

const server = express();
const PORT = process.env.PORT;
server.use(express.json())

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);
server.use(passport.initialize())
server.use(App)
server.listen(PORT,() => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
});

