import client, { adminPass, pepper, saltRounds, secret } from "../properties/dbconnection"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
export type Users = {
     id?:number;
    firstName:string;
    lastName:string;
    password:string;
 }

 export class UsersStore{
    async index():Promise<Users[]>{
     try{
         const conn = await client.connect()
         const sql = 'select * from users'
         const result = await conn.query(sql)
         conn.release()
         return result.rows
     }catch(err){
         throw new Error('could not get users'+err); 
     }
    }

    async create(user:Users):Promise<Users>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds)
              );
            const result = await conn.query(sql,[user.firstName,user.lastName,hash])
            conn.release()
            
            return result.rows[0]
        }catch(err){
            throw new Error('could not add user'+err); 
        }
    }

    async authenticate(user:Users): Promise<string|null> {
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE firstname=($1)'
    
        const result = await conn.query(sql, [user.firstName])
        if(result.rows.length) {
    
          const userfromDb = result.rows[0]
          var token = jwt.sign({ user: userfromDb }, secret);
          if (bcrypt.compareSync(user.password+pepper, userfromDb.password)) {
            return token
          }
        }else{
            const hash = bcrypt.hashSync(
                adminPass + pepper, 
                parseInt(saltRounds)
              );
            if(user.firstName=='Admin' && bcrypt.compareSync(user.password+pepper, hash)){
                var token = jwt.sign({ user: user }, secret);
                return token
            }
        }
    
        return null
      }

    async getById(id: string):Promise<Users>{
        try{
            const conn = await client.connect()
            const sql = 'select * from users where id = ($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`could not get user with id ${id}: `+err); 
        }
       }

       async delete (id: string):Promise<Users>{
        try{
            const conn = await client.connect()
            const sql = 'delete from users where id = ($1)  RETURNING *'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`could not get user with id ${id}: `+err); 
        }
       }
 }