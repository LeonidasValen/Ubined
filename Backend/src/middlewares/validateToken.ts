import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { JWT_TOKEN } from "../config";

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No estás autenticado" });

    jwt.verify(token, JWT_TOKEN as Secret, (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
        if (err) return res.status(403).json({ message: "Token inválido" });

        req.user = user as JwtPayload;

        next();
    })
}