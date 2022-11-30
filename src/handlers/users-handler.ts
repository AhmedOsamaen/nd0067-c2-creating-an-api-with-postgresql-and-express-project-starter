import { Users, UsersStore } from "../models/users";
import express, {Request, Response} from 'express'


const userStore = new UsersStore();

const index = async(req:Request,res:Response)=>{
    const users = await userStore.index()
    res.json(users);
}

const getUserById = async(req:Request,res:Response)=>{
    const users = await userStore.getById(req.params.id)
    res.json(users);
}

const createUser = async(req:Request,res:Response)=>{
    try {
        const user: Users = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }

        const newUser = await userStore.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticateUser = async(req:Request,res:Response)=>{
    try {
        const user: Users = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }

        const newUser = await userStore.authenticate(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const deleteUserById = async(req:Request,res:Response)=>{
    try{
        const users = await userStore.delete(req.params.id)
        res.json(users);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const allUsers_routes = (app: express.Application)=>{
    app.get('/users',index)
    app.post('/users', createUser)
    app.get('/users/:id', getUserById)
    app.delete('/users/:id', deleteUserById)
    app.post('/users/auth', authenticateUser)
}

export default allUsers_routes;