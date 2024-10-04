import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import { getUser } from "../controllers/user.controller";
import { openConnection } from "../middlewares/openConnection";

const router: Router = Router()

//trae los datos del usuario
router.get('/user', openConnection, validateToken, getUser)

export default router