import { Prisma } from "@prisma/client"
import { prisma } from "../../libs/prisma.js"

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({ data })

    } catch (err) {
        return false;
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })

    } catch (err) {
        return false;
    }
}

export const getAllUsers = async (name: string) => {
    //findmany -> pega tudo
    const users = await prisma.user.findMany({
        where: {
          name: {
            startsWith: name
          }  
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
    return users
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    })
    return user;
}

export const getUserByName = async (name: string) => {
    const user = await prisma.user.findFirst({
        where: { name },

    })
    return user;
}