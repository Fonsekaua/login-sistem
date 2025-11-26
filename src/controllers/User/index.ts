import { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (req, res) => {
    res.send("Get all users");
}

export const getUserByEmail: RequestHandler = async (req, res) => {
    res.send(`Get user by email`);
}

export const createUser: RequestHandler = async (req, res) => {
    res.send("Create user");
}

export const editUser: RequestHandler = async (req, res) => {
    res.send("Edit user");
}

export const deleteUser: RequestHandler = async (req, res) => {
    res.send("Delete user");
}