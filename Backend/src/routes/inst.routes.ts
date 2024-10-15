import { Router } from "express";
import { getSchool, getSchools } from "../controllers/insti.controller";
import { openConnection } from "../middlewares/openConnection";
import { validateSchema } from "../middlewares/validateSchema";
import { instiFilterSchema } from "../schema/insti.schema";

const router:Router = Router()

router.get('/schools', validateSchema(instiFilterSchema), openConnection, getSchools)

router.get('/school/:id', openConnection, getSchool)

export default router