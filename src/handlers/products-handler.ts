import express, {Request, Response} from 'express'
import { verifyAuthToken } from '../middleware/jwt-auth';
import { Products, ProductsStore } from '../models/products';


const productsStore = new ProductsStore();

const index = async(req:Request,res:Response)=>{
    const products = await productsStore.index()
    res.json(products);
}

const getProductById = async(req:Request,res:Response)=>{
    const products = await productsStore.getById(req.params.id)
    res.json(products);
}

const createProduct = async(req:Request,res:Response)=>{
    try {
        const product: Products = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await productsStore.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const deleteProductById = async(req:Request,res:Response)=>{
    try{
        const users = await productsStore.delete(req.params.id)
        res.json(users);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const allProducts_routes = (app: express.Application)=>{
    app.get('/products',index)
    app.post('/products',verifyAuthToken, createProduct)
    app.get('/products/:id', getProductById)
    app.delete('/products/:id', deleteProductById)
}

export default allProducts_routes;