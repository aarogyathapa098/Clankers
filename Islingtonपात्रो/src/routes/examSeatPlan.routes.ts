import { Router } from "express";

import {
    generateSeatPlan,
    validateSeatPlan
} from "../controllers/examSeatPlan.controller";

const router = Router();

router.post(
    "/:sessionId/generate",
    generateSeatPlan
);

router.get(
    "/:sessionId/validate",
    validateSeatPlan
);

export default router;