import { Router } from "express";

import {
    getProgrammes,
    getProgramme,
    createProgramme,
    updateProgramme,
    deleteProgramme
} from "../controllers/programme.controller";

const router = Router();

router.get("/", getProgrammes);
router.get("/:id", getProgramme);
router.post("/", createProgramme);
router.put("/:id", updateProgramme);
router.delete("/:id", deleteProgramme);

export default router;