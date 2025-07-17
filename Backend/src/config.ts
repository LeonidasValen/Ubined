import dotenv from 'dotenv'
//configura las variables globales
dotenv.config()

//exporta las variables de entorno
export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const DATABASE = process.env.DATABASE;
export const USER = process.env.USER;
export const PASS = process.env.PASS;

export const JWT_TOKEN = process.env.JWT_TOKEN;
export const FREEPORT = process.env.FREEPORT; //Borrar en producción
export const PORTFRONTEND = process.env.PORTFRONTEND;
export const PORTFRONTENDTEST = process.env.PORTFRONTENDTEST;

export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME; 
export const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY; 
export const CLOUD_API_SECRET = process.env.CLOUDINARY_API_SECRET; 
