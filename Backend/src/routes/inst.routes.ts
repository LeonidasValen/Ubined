import { Router } from "express";
import { getSchool, getSchools, postSchool } from "../controllers/insti.controller";
import { openConnection } from "../middlewares/openConnection";
import { validateSchema, validateSchemaSchool } from "../middlewares/validateSchema";
import { instiFilterSchema, schoolSchema } from "../schema/insti.schema";

import { getLocalidades, getModalities, getProvincias } from "../controllers/extra.controller";
import { validateToken } from "../middlewares/validateToken";
import { uploadImages } from "../libs/multerImg";

const router:Router = Router()

router.get('/schools', validateSchema(instiFilterSchema), openConnection, getSchools)

router.get('/school/:id', openConnection, getSchool)

router.post('/school',  validateToken,  uploadImages, validateSchemaSchool(schoolSchema), openConnection,  postSchool) //no toques las rutas :)

router.get('/modality', openConnection, getModalities)

router.get('/provincias', openConnection, getProvincias)

router.get('/localidades/:id', openConnection, getLocalidades)

export default router