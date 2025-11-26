import { Router } from 'express'
import * as User from '../controllers/User/index.js';

export const App = Router();
App.get("/users", User.getAllUsers);
App.get("/user", User.getUserByEmail);
App.post("/user", User.createUser);
App.put("/user/:id", User.editUser);
App.delete("/user/:id", User.deleteUser);
