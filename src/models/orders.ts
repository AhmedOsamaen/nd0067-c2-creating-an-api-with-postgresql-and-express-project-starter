
import client from "../properties/dbconnection"
import { OrderStatus } from "../util/consts";
export type Orders = {
    id?:number;
   user_id:number;
   order_status?:number;
}

export class OrdersStore{
    async index():Promise<Orders[]>{
        try{
            const conn = await client.connect()
            const sql = 'select * from Orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error('could not get Orders'+err); 
        }
       }
   
       async create(order:Orders):Promise<Orders>{
           try{
               const conn = await client.connect()
               const order_status = OrderStatus.active
               const sql = 'INSERT INTO Orders (user_id,order_status) VALUES($1, $2) RETURNING *'
               
               const result = await conn.query(sql,[order.user_id,order_status])
               conn.release()
               return result.rows[0]
           }catch(err){
               throw new Error('could not add order'+err); 
           }
       }
   
       async getById(id: string):Promise<Orders>{
           try{
               const conn = await client.connect()
               const sql = 'select * from Orders where id = ($1)'
               const result = await conn.query(sql,[id])
               conn.release()
               return result.rows[0]
           }catch(err){
               throw new Error(`could not get order with id ${id}: `+err); 
           }
          }
   
          async delete (id: string):Promise<Orders>{
           try{
               const conn = await client.connect()
               const sql = 'delete from Orders where id = ($1) RETURNING *'
               const result = await conn.query(sql,[id])
               conn.release()
               return result.rows[0]
           }catch(err){
               throw new Error(`could not delete order with id ${id}: `+err); 
           }
          }
}