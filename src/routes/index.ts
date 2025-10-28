import {Router} from 'express'
import { prisma } from '../libs/prisma.js';

export const MainRouter = Router();

MainRouter.get("/ping",(req,res) => {
    res.json({pong: true});
});

MainRouter.get("/test",(req,res)=> {
    prisma.user
})