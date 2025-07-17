import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateSchema = <T>(schema: ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body); // Recibe los datos del formulario 
        next() //lugo es enviado a su respectivo validacion del schema
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: error.errors.map(error => error.message) }) //recopila el error de zod luego es enviado al frontend
        } else {
            return res.status(500).json({ error: 'Error interno del servidor al validar los datos' })
        }
    }
}

export const validateSchemaSchool = <T>(schema: ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => {
    try {

        // chequea que el campo managers sea un array y si existe
        if (typeof req.body.managers === 'string') {
            req.body.managers = JSON.parse(req.body.managers);
        }

        if (typeof req.body.offerts === 'string') {
            req.body.offerts = JSON.parse(req.body.offerts);
        }

        if (typeof req.body.socialLink === 'string') {
            req.body.socialLink = JSON.parse(req.body.socialLink);
        }

        schema.parse(req.body); // Recibe los datos del formulario 
        next() //lugo es enviado a su respectivo validacion del schema
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: error.errors.map(error => error.message) }) //recopila el error de zod luego es enviado al frontend
        } else {
            return res.status(500).json({ error: 'Error interno del servidor al validar los datos' })
        }
    }
}