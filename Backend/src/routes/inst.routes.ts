import { Router } from "express";
import { getSchool, getSchools } from "../controllers/insti.controller";
import { openConnection } from "../middlewares/openConnection";

const router:Router = Router()

router.get('/schools', openConnection, getSchools)

router.get('/school/:id', openConnection, getSchool)

export default router