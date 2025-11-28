import { User } from "@prisma/client";
import { RequestHandler } from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { getUserByEmail } from "../../models/User/index.js";
const dotenv = await import('dotenv');
dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

export const jwtStrategy = new JwtStrategy(options, async (payload,done) => {
        console.log("payload", payload);
        const { email } = payload
        console.log("Console do email",email)
        const User = await getUserByEmail(email as string);
        if(User){
            return done(null,User)
        }else{
            return done(null,false)
        }
})

export const jwtStrategyAuth:RequestHandler = (req,res,next) => {
    const AuthRequest = passport.authenticate('jwt',(err:any, user: User | false,info: any) => {
        if(user){
            req.user = user;
            return next();
        }
        return res.status(401).json({err: 'Acesso Negado',details: info});
    });
    AuthRequest(req,res,next)
}
