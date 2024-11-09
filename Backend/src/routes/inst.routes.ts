import { Router } from "express";
import { getSchool, getSchools } from "../controllers/insti.controller";
import { openConnection } from "../middlewares/openConnection";
import { validateSchema } from "../middlewares/validateSchema";
import { instiFilterSchema } from "../schema/insti.schema";

import { getLocalidades, getModalities, getProvincias } from "../controllers/extra.controller";

const router:Router = Router()

router.get('/schools', validateSchema(instiFilterSchema), openConnection, getSchools)

router.get('/school/:id', openConnection, getSchool)

router.get('/modality', openConnection, getModalities)

router.get('/provincias', openConnection, getProvincias)

router.get('/localidades/:id', openConnection, getLocalidades)

export default router