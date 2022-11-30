import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import allUsers_routes from './handlers/users-handler'
import allProducts_routes from './handlers/products-handler'
import allOrders_routes from './handlers/orders-handler'

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

allUsers_routes(app)
allProducts_routes(app)
allOrders_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
