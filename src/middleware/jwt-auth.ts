import express, { RequestHandler,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { secret } from '../properties/dbconnection';


export const verifyAuthToken:RequestHandler = (req: express.Request, res: express.Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            throw new Error('Token is required in Authorization header')
        }
        const token = authorizationHeader.split(' ')[1]

        const decoded = jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(401)
        res.send(error+' And Assign Bearer before token ')
    }
}