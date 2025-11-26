import { RequestHandler } from "express";
import * as Model from "../../models/User/index.js";
import { Prisma } from "@prisma/client";
export const getAllUsers: RequestHandler = async (req, res) => {
    const Users = await Model.getAllUsers();

    res.json(Users);
}

export const getUserByEmail: RequestHandler = async (req, res) => {
    const {email} = req.query as {email: string}
    const User = await Model.getUserByEmail(email)
    if(!User){
        res.status(404).send("User not found");
        return; 
    }
    res.status(200).json(User);
}

export const createUser: RequestHandler = async (req, res) => {
    const {name, email, password} = req.body as {name: string, email: string, password: string};
    if(!name || !email || !password){
        res.status(400).send("Missing required fields: name, email, password");
        return;
    }
        else if (name.length < 3){
        res.status(400).send("Name must be at least 3 characters long");
        return;
    }
    else if (!email.includes("@")){
        res.status(400).send("Invalid email format");
        return;
    }
        else if (password.length < 8){
        res.status(400).send("Password must be at least 6 characters long");
        return;
    }
    const User = await Model.createUser({name, email, password});
    res.status(201).json(User);
}

export const editUser: RequestHandler = async (req, res) => {
    const {id} = req.params as {id: string};
    const data = req.body as Prisma.UserUpdateInput;
    
    const User = await Model.editUserById(Number(id), data);
    if(!User){
        res.status(404).send("User not found");
        return; 
    }
    
    res.status(200).json(User);
    
}
export const deleteUser: RequestHandler = async (req, res) => {
    const {id} = req.params as {id: string};
    const User = await Model.deleteUserById(Number(id));
    if(!User){
        res.status(404).send("User not found");
        return; 
    }
    res.status(200).json(User);
}