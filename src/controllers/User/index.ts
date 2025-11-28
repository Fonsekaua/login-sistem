import { RequestHandler } from "express";
import * as Model from "../../models/User/index.js";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createUserSchema, updateUserSchema } from "../../services/User/index.js";
export const getAllUsers: RequestHandler = async (req, res) => {
    const Users = await Model.getAllUsers();
    res.json(Users);
}

export const getUserByEmail: RequestHandler = async (req, res) => {
    const {email} = req.query as {email: string}
    const User = await Model.getUserByEmail(email);
    if(!User){
        res.status(404).send("User not found");
        return; 
    }
    res.status(200).json(User);
}

export const createUser: RequestHandler = async (req, res) => {
    const data = createUserSchema.parse(req.body);
    const {name, email, password, role} = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await Model.createUser({
        name,
        email,
        password: hashedPassword,
        role
    } as Prisma.UserCreateInput);
    res.status(201).json(User);
}

export const createUsers: RequestHandler = async (req, res) => {
    const data = req.body as  Prisma.UserCreateManyInput[];
    const User = await Model.createUsers(data);
    res.status(201).json(User);
}
export const editUser: RequestHandler = async (req, res) => {
    const {id} = req.params as {id: string};

    const data = updateUserSchema.parse(req.body);
    
    const User = await Model.editUserById(Number(id), data as Prisma.UserUpdateInput);
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
export const deleteUsers: RequestHandler = async (req, res) => {
    const User = await Model.deleteAllUsers();
    res.status(200).json(User);
} 
export const loginUser:RequestHandler = async (req,res) => {
    res.json({
        user:req.user,
        auth: req.authInfo
    })
}