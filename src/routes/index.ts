import { Router } from 'express'
import * as User from '../controllers/User/index.js';

export const App = Router();

App.get("/users", User.getAllUsers);