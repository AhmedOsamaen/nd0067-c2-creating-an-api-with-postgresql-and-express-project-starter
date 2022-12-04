import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
    ADMIN_PASS,
    NODE_ENV
} = process.env 
let client=new Pool
if(NODE_ENV==='dev'){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if(NODE_ENV==='test'){
    console.log('using test env :>> ');
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}


export const pepper = BCRYPT_PASSWORD;
export const saltRounds = SALT_ROUNDS as string;
export const secret = TOKEN_SECRET as string;
export const adminPass = ADMIN_PASS as string;


export default client