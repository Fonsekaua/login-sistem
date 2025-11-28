import { Prisma, User } from "@prisma/client";
import { prisma } from "../../libs/Prisma/index.js";
import bcrypt from "bcryptjs";

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
export const createUsers = async (data: Prisma.UserCreateManyInput[]) => {
  try {
    // hash de todas as senhas
    const usersWithHashedPasswords = await Promise.all(
      data.map(async (user) => ({
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password as string, 10),
        role: user.role ?? "Visitant"
      }))
    );

    // cria todos os usuários
    const result = await prisma.user.createMany({
      data: usersWithHashedPasswords,
      skipDuplicates: true
    });

    return result; // { count: X }
  } catch (error) {
    return error;
  }
};
export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
        select: {
            name: true,
            email: true,
            password: true,
            role: true
        }
    });
        return users;
    } catch (error) {

        return error;
    }
}
export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password:true
            }
        })
        return user;
}   catch (error) { 
        return error;
}

}

export const findUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email},
            select: {
                id: true,
                name: true,
                email: true,
                role:true,
                password: true
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

export const deleteAllUsers = async () => {
    try {
        const user = prisma.user.deleteMany();
        return user;
    } catch (error) {
        return error;
    }
}
