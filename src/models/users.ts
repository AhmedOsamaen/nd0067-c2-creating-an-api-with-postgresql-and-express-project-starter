import client, { pepper, saltRounds } from "../properties/dbconnection"
import bcrypt from "bcrypt"

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
         throw new Error('could get users'+err); 
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

    async authenticate(user:Users): Promise<Users|null> {
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE firstname=($1)'
    
        const result = await conn.query(sql, [user.firstName])
    
        console.log(user.password+pepper)
    
        if(result.rows.length) {
    
          const userfromDb = result.rows[0]
    
          console.log(userfromDb)
    
          if (bcrypt.compareSync(user.password+pepper, userfromDb.password)) {
            console.log('true :>> ', true);
            return userfromDb
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
            throw new Error(`could get user with id ${id}: `+err); 
        }
       }

       async delete (id: string):Promise<Users>{
        try{
            const conn = await client.connect()
            const sql = 'delete from users where id = ($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`could get user with id ${id}: `+err); 
        }
       }
 }