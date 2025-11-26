import { Prisma, User } from "@prisma/client";
import { prisma } from "../../libs/Prisma/index.js";

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        const user = await prisma.user.create({
            data
        });
        return user;
    } catch (error) {

        return error;
    }
}
export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {

        return error;
    }
}
export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email},
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return user;
}   catch (error) { 
        return error;
}

}

export const findUserByEmailAndPassword = async (email: string, password:string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email,password},
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return user;
}   catch (error) { 
        return error;
}

}
export const editUserById = async (id: number, data: Prisma.UserUpdateInput) => {
    try {
         const user = await prisma.user.update({
            where: { id },
            data
        });
        return user;
    } catch (error) {

        return error;
    }                   

}

export const deleteUserById = async (id: number) => {
    try {
        const user = prisma.user.delete({
            where: {
                id
            }
        })
        return user;
    } catch (error) {
        return error;
    }
}
