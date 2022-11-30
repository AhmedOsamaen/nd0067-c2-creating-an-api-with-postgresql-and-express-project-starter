
import client from "../properties/dbconnection"
export type Products = {
    id?:number;
   name:string;
   price:number;
}

export class ProductsStore{
    async index():Promise<Products[]>{
        try{
            const conn = await client.connect()
            const sql = 'select * from products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error('could not get products'+err); 
        }
       }
   
       async create(product:Products):Promise<Products>{
           try{
               const conn = await client.connect()
               const sql = 'INSERT INTO products (name,price) VALUES($1, $2) RETURNING *'
               
               const result = await conn.query(sql,[product.name,product.price])
               conn.release()
               return result.rows[0]
           }catch(err){
               throw new Error('could not add product'+err); 
           }
       }
   
       async getById(id: string):Promise<Products>{
           try{
               const conn = await client.connect()
               const sql = 'select * from products where id = ($1)'
               const result = await conn.query(sql,[id])
               conn.release()
               return result.rows[0]
           }catch(err){
               throw new Error(`could not get product with id ${id}: `+err); 
           }
          }
   
          async delete (id: string):Promise<Products>{
           try{
               const conn = await client.connect()
               const sql = 'delete from products where id = ($1) RETURNING *'
               const result = await conn.query(sql,[id])
               conn.release()
               return result.rows[0]
           }catch(err){
               throw new Error(`could not delete product with id ${id}: `+err); 
           }
          }
}