import express, {Request, Response} from 'express'
import { Orders, OrdersStore } from '../models/orders';


const ordersStore = new OrdersStore();

const index = async(req:Request,res:Response)=>{
    const orders = await ordersStore.index()
    res.json(orders);
}

const getorderById = async(req:Request,res:Response)=>{
    const orders = await ordersStore.getById(req.params.id)
    res.json(orders);
}

const createorder = async(req:Request,res:Response)=>{
    try {
        const order: Orders = {
            user_id: req.body.user_id,
        }
        const neworder = await ordersStore.create(order)
        res.json(neworder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const deleteorderById = async(req:Request,res:Response)=>{
    try{
        const users = await ordersStore.delete(req.params.id)
        res.json(users);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const allOrders_routes = (app: express.Application)=>{
    app.get('/orders',index)
    app.post('/orders', createorder)
    app.get('/orders/:id', getorderById)
    app.delete('/orders/:id', deleteorderById)
}

export default allOrders_routes;