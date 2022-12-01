import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
    ADMIN_PASS
} = process.env 

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

export const pepper = BCRYPT_PASSWORD;
export const saltRounds = SALT_ROUNDS as string;
export const secret = TOKEN_SECRET as string;
export const adminPass = ADMIN_PASS as string;

export default client