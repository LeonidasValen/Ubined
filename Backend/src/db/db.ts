import mysql, {Pool, PoolConnection} from 'mysql2/promise'
import { DATABASE, HOST, PASS, USER } from '../config'

declare global {
    namespace Express {
        interface Request {
            db?: PoolConnection;
        }
    }
}

const pool: Pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASS,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 1000
})


async function connectDB(): Promise<PoolConnection> {
    try {
        const connection: PoolConnection = await pool.getConnection()
        console.log('conexion establecida')
        return connection
    } catch (error) {
        console.error('Error al conectarse al servidor', error)
        throw error;
    }
}

export default connectDB