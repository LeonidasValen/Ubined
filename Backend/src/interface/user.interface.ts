import { Request } from "express";
import { RowDataPacket } from "mysql2/promise";

export interface UserIdInterface extends Request {
    user?: {
        userId: number; // Ajusta el tipo según la estructura real de `user`
    };
}

export interface UserIsExisting extends RowDataPacket {
    id: number;
    profile: string | null;
    title: string;
    email: string;
    rol: string;
    createdAt: Date;
}

export interface UserResultInterface extends RowDataPacket {
    id: number;
    profile: string;
    title: string;
    email: string;
    password: string;
    rol: string;
}