import { Router } from 'express'
import * as User from '../controllers/User/index.js';

export const App = Router();
App.get("/users", User.getAllUsers);
App.get("/user/:email", User.getUserByEmail);
App.post("/user", User.createUser);
App.put("/user", User.editUser);
App.delete("/user", User.deleteUser);
