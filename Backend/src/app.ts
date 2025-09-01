import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PORTFRONTEND } from "./config";

//configura express
const app: Express = express()
//configura las cors
const corsOptions: CorsOptions = {
    //origin: ['http://localhost:5173', 'http://localhost:4173'],
    origin: PORTFRONTEND,  // URL de las paginas que pueda hacer operaciones 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limita los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Limita los encabezados permitidos
    credentials: true, // Habilita el uso de credenciales (cookies, encabezados de autorización, etc.)
}

app.use(cors(corsOptions));
app.use(morgan('dev')); // ver peticiones del backend
//app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //acepta los formatos json
app.use(cookieParser()); // configura las cookies

export default app