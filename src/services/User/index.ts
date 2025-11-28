import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import z from 'zod'
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

const password = () => {
   return z.string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula")
  .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "A senha deve ter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "A senha deve ter pelo menos um caractere especial");
  
}

export const createUserSchema = z.object({
    name: z.string().min(2,"nome deve ter mais que 2 caracteres!").max(255),
    email: z.string().email("Email invalido").max(300),
    password: password(),
    role: z.enum(["Admin","User","Visitant"]).optional(),
})
export const createUsersSchema = z.array(createUserSchema);

export const updateUserSchema = createUserSchema.partial();

export const loginUserSchema = z.object({
    email: z.string().email("Email invalido").max(300),
    password: password(),
})
