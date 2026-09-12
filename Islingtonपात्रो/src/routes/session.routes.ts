import { Router } from "express";

import {
    getSessions,
    getSession,
    createSession,
    updateSession,
    deleteSession
} from "../controllers/session.controller";

const router = Router();

router.get("/", getSessions);
router.get("/:id", getSession);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

export default router;