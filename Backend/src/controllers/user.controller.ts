import { UserIdInterface, UserIsExisting } from "../interface/user.interface";
import { RowDataPacket } from "mysql2/promise";
import { Request, Response } from "express";

type GETExistingUser = Omit<UserIsExisting, 'f_creation'>

export const getUser = async (req: UserIdInterface, res: Response): Promise<void> => {
    try {
        // Casting del tipo 'Request' a 'UserIdInterface'
        const userId = req.user?.userId;  // ID del usuario obtenido del token

        // Realizar consulta en la base de datos
        const [userSql] = await req.db!.query<(GETExistingUser & RowDataPacket)[]>(
            "SELECT id, profile, title, email, rol FROM users WHERE id = ?", 
            [userId]
        );

        if (userSql.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const user = userSql[0];
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};