import { Router } from 'express'
import * as User from '../controllers/User/index.js';
import { localStrategyAuth } from '../libs/PassportLocal/index.js';
import { jwtStrategyAuth } from '../libs/PassportJwt/index.js';
import { validate } from '../middlewares/index.js';
import * as z from '../services/User/index.js';

export const App = Router();
App.get("/users", User.getAllUsers);
App.get("/user", User.getUserByEmail);
App.post("/user",validate(z.createUserSchema), User.createUser);
App.post("/user/login",validate(z.loginUserSchema), localStrategyAuth, User.loginUser)
App.put("/user/:id", User.editUser);
App.delete("/user/:id", User.deleteUser);

App.post("/users",validate(z.createUsersSchema), User.createUsers);
App.delete("/users", User.deleteUsers);

App.get("/private", jwtStrategyAuth, (req,res) => {
    res.json({msg: "Acesso Liberado", user: req.user});
});
