import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema, regisSchema } from "../schema/auth.schema";
import { openConnection } from "../middlewares/openConnection";
import { login, logout, register } from "../controllers/auth.controller";

const router:Router = Router()

// Register
router.post('/register', validateSchema(regisSchema), openConnection, register)
//Validate email user
router.post('/verifyEmail', )
//Login
router.post('/login', validateSchema(loginSchema), openConnection, login)
//Logout
router.post('/logout', openConnection, logout)

export default router