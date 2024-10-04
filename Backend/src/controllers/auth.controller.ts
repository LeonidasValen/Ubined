import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2/promise";
import bcrypt from "bcrypt"
import { UserResultInterface } from "../interface/user.interface";
import { createJWT } from "../libs/createJWT";

interface ExistingUser extends RowDataPacket {
    email: string;
    username: string;
}

// Generar OTP de 6 dígitos
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un número entre 100000 y 999999
}

//Register
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, email, password } = req.body
    console.log(title, email, password)
    try {
        const [isExistingUser] = await req.db!.query<ExistingUser[]>("SELECT email, title FROM users WHERE email = ? OR title = ?", [email, title])
        //verfica si ya existe el nombre o el correo
        if (isExistingUser.length > 0) {
            const { email: existingEmail, title: existingName } = isExistingUser[0];
            const message = existingEmail === email && existingName === title
                ? "El Correo y el Nombre ya están registrados"
                : existingEmail === email
                    ? "El Correo ya está registrado"
                    : "El Nombre ya está registrado"
            res.status(409).json({ message })
            return
        }

        //encripta la contraseña
        const hash = await bcrypt.hash(password, 12)

        //inserta los datos
        await req.db!.query("INSERT INTO users (title, email, password) VALUES (?, ?, ?)", [title, email, hash])

        //Crea un token de verificacion para validar el correo
        const verificationToken = generateOTP();
        await req.db!.query("UPDATE users SET verify_token = ? WHERE email =  ?", [verificationToken, email])

        //envia el token al correo para luego verificar
        // req.body.verificationToken = verificationToken;
        // req.body.email = email;
        // next();

        res.status(201).json({ message: 'Usuario registrado correctamente. Correo de verificación enviado. Verifique su correo electronico' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al registrarse" })
    }
}

//Login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        //verifica que el correo este registrado
        const [sql] = await req.db!.query<UserResultInterface[]>("SELECT id, profile, title, email, password, rol FROM users WHERE email = ?", [email])

        //verifica si las contraseñas coinciden
        const user = sql[0];//guarda los datos del usuario obtenidos
        if (!sql.length || !(await bcrypt.compare(password, user.password))) {
            res.status(404).json({ message: 'Correo o contraseña incorrecto' });
            return;
        }

        //crea la cookie
        const token = await createJWT({ userId: user.id })
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })//envia la cookie con los metodos de seguridad

        res.status(201).json({
            id: user.id,
            profile: user.profile,
            title: user.title,
            email: user.email,
            password: user.password,
            rol: user.rol,
            message: 'Sesión iniciada correctamente'
        })
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
    }
}

//Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error al cerrar sesión', error });
    }
}