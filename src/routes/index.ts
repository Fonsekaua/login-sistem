import { Router } from 'express'
import * as User from '../controllers/User/index.js';
import { localStrategyAuth } from '../libs/PassportLocal/index.js';
import { jwtStrategyAuth } from '../libs/PassportJwt/index.js';

export const App = Router();
App.get("/users", User.getAllUsers);
App.get("/user", User.getUserByEmail);
App.post("/user", User.createUser);
App.post("/user/login",localStrategyAuth, User.loginUser)
App.put("/user/:id", User.editUser);
App.delete("/user/:id", User.deleteUser);
App.get("/private", jwtStrategyAuth, (req,res) => {
    res.json({msg: "Acesso Liberado", user: req.user});
});
