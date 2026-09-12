import { Router } from "express";

import {
    generateInvigilators
} from "../controllers/invigilator.controller";

const router = Router();

router.post(
    "/:sessionId/generate",
    generateInvigilators
);

export default router;