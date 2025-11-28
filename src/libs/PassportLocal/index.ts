import { Strategy as LocalStrategy } from "passport-local"
import { RequestHandler } from "express";
import passport from "passport";
import { Prisma, User } from "@prisma/client";
import { findUserByEmail } from "../../models/User/index.js";
import { createUserJwt } from "../../services/User/index.js";
import bcrypt from "bcryptjs";

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

    // busca só o usuário com a senha
    const user = await findUserByEmail(email) as Prisma.UserGetPayload<{
        select: { id: true; name: true; email: true; role:true; password: true; }
    }>;

    if (!user) return done(null, false);

    // compara senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false);

    // Cria token
    const token = await createUserJwt(user as User);

    // Retorna usuário sem a senha
    const { password: _, ...userWithoutPassword } = user;

    return done(null, {
        auth: { token },
        user: userWithoutPassword
    });
});

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
