import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
export const createUserJwt = (user: User): string => {
    const payload = {
        id: user.id,
        role: user.role, // se tiver roles
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h", // token válido por 1 hora
    });

    return token;
};      