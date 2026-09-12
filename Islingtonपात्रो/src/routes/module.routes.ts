import { Router } from "express";

import {
    getModules,
    getModule,
    createModule,
    updateModule,
    deleteModule
} from "../controllers/module.controller";

const router = Router();

router.get("/", getModules);
router.get("/:id", getModule);
router.post("/", createModule);
router.put("/:id", updateModule);
router.delete("/:id", deleteModule);

export default router;