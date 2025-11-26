import { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (req, res) => {
    res.send("Get all users");
}