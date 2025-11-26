import { Strategy as LocalStrategy } from "passport-local"
import { RequestHandler } from "express";
import passport from "passport";
import { User } from "@prisma/client";
import { findUserByEmailAndPassword } from "../../models/User/index.js";
import { createUserJwt } from "../../services/User/index.js";

type LocalStrategyResponse = {
    auth: {
        token: string
    }
    user: User
}

export const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    console.log('email:', email);
    console.log('password: ', password);

    const user = await findUserByEmailAndPassword(email, password);
    if (user) {
        const token = createUserJwt(user as User);

        const response: LocalStrategyResponse = {
            auth: { token : await token },
            user : user as User
        }
        return done(null, response);
    } else {
        return done(null, false)
    }
})

export const localStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('local',
        (err: any, response: LocalStrategyResponse | false) => {
           if(response){
                req.user = response.user,
                req.authInfo = response.auth
                return next();
           }
           return res.status(401).json({err: 'Acesso Negado'})
        })
    authRequest(req, res, next);
}