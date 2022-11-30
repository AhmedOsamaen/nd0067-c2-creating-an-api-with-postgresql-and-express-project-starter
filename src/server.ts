import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import allUsers_routes from './handlers/users-handler'

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

allUsers_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
