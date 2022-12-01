import { Orders } from "../models/orders"
import client from "../properties/dbconnection"
import { OrderStatus } from "../util/consts"

export type OrderProducts={
    id?:number
   user_id:number
   order_status?:string
   products:Cart[]
}
export type Cart={
    productId:number;
    quantity:number;
}

export class OrderProductsService{

    async index():Promise<OrderProducts[]>{
        try{
            const conn = await client.connect()
            const sql = 'select * from Orders'
            const result = await conn.query(sql)
            let orderProdsResult:OrderProducts[]=[]
            if(result.rows){
                const orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)'
                for(let i of result.rows){
                    const prodResult = await conn.query(orderProductsSql, [i.id])
    
                    const orderProduct = prodResult.rows

                    const orderProducts :OrderProducts = {...i,products:orderProduct}
                    orderProdsResult.push(orderProducts);
                }
            }
            conn.release()
            return orderProdsResult
        }catch(err){
            throw new Error('could not get Orders'+err); 
        }
       }
      async addProduct(quantity: number, orderId: string, productId: string): Promise<Orders> {
        // get order to see if it is open
        try {
          const ordersql = 'SELECT * FROM orders WHERE id=($1)'
          const conn = await client.connect()
    
          const result = await conn.query(ordersql, [orderId])
    
          const order = result.rows[0]
    
          if (order.order_status !== OrderStatus.active) {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.order_status}`)
          }
    
          conn.release()
        } catch (err) {
          throw new Error(`${err}`)
        }
    
        try {
          const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          const conn = await client.connect()
    
          const result = await conn
              .query(sql, [quantity, orderId, productId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }

      async getOrderProductsDetails(orderId?: string,userId?: string):Promise<OrderProducts>{
        try{
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const orderResult = await conn.query(ordersql, [orderId])
    
            const order = orderResult.rows[0]

            if(!orderResult.rows[0]){
                throw new Error('No Order Found')
            }

            const orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)'

            const result = await conn.query(orderProductsSql, [orderId])
    
            const orderProduct = result.rows

            const orderProducts :OrderProducts = {...order,products:orderProduct}

            return orderProducts;

        }catch(err){
            throw new Error(`Could not get order ${orderId}: ${err}`)
        }
      }

      async getActiveOrderProductsDetails(userId: string):Promise<OrderProducts>{
        try{
            const ordersql = 'SELECT * FROM orders WHERE user_id=($1) and order_status =($2)'
            const conn = await client.connect()

            const orderResult = await conn.query(ordersql, [userId,OrderStatus.active])
    
            const order = orderResult.rows[0]
            if(!order){
                throw new Error(`No Active Orders Found for user ${userId}:`)
            }

            const orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)'

            const result = await conn.query(orderProductsSql, [order.id])
    
            const orderProduct = result.rows

            const orderProducts :OrderProducts = {...order,products:orderProduct}

            return orderProducts;

        }catch(err){
            throw new Error(`Could not get order for user ${userId}: ${err}`)
        }
      }

      async completedOrders(userId: string):Promise<OrderProducts[]>{
        try{
          const ordersql = 'SELECT * FROM orders WHERE user_id=($1) and order_status =($2)'
          const conn = await client.connect()

          const orderResult = await conn.query(ordersql, [userId,OrderStatus.complete])
  
          
            let orderProdsResult:OrderProducts[]=[]
            if(orderResult.rows){
                const orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)'
                for(let i of orderResult.rows){
                    const prodResult = await conn.query(orderProductsSql, [i.id])
    
                    const orderProduct = prodResult.rows

                    const orderProducts :OrderProducts = {...i,products:orderProduct}
                    orderProdsResult.push(orderProducts);
                }
            }
            conn.release()
            return orderProdsResult
        }catch(err){
            throw new Error('could not get Orders'+err); 
        }
       }
}