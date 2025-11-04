import { Router } from 'express'
import { createUser, createUsers, getAllUsers, getUserByEmail } from '../services/user/index.js';

export const MainRouter = Router();

MainRouter.get('/', (req, res) => {
    res.send("Modulo: Integrando node com banco de dados")
});

MainRouter.get("/ping", (req, res) => {
    res.json({ pong: true });
});

MainRouter.post("/user", async (req, res) => {
    const user = await createUser({
        name: 'Peter Parker',
        email: 'Peter.B.parker@gmail.com',
        posts: {
            create: {
                title: "Spider-Man",
                subtitle: "Imagem de capa do Spider-Man",
                body: "url da imagem do spider-man"
            }
        }
    })
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(500).json({ Error: "E-mail já cadastrado!!" })
    }
})
MainRouter.post("/users", async (req, res) => {
    const users = await createUsers(
        [
            {
                name: "Castiel",
                email: "Castiel@sobrenatural.angel.com.sky"
            },
            {
                name: "Sam Winchester",
                email: "Sammy@winchester.hunter.com.earth"
            },
            {
                name: "Dean Winchester",
                email: "dem@winchester.hunter.com.earth"
            }
        ],
    )
    if (users) {
        res.status(201).json({ users });
    } else {
        res.status(500).json({ Error: "Algum erro ocorreu no sistema" })
    }
})
MainRouter.get('/users',async(req,res)=>{
    const result = (await getAllUsers("Kauã"));
    res.json({ result })
})

MainRouter.get('/user',async(req,res) => {
    const result = await getUserByEmail('fonsecakauasilva3@gmail.com');
    res.json({ result })
})