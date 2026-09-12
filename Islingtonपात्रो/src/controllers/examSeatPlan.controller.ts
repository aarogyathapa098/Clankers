import { Request, Response } from "express";
import { ExamSeatPlanService } from "../services/examSeatPlan.service";

const service = new ExamSeatPlanService();

export const generateSeatPlan = async (
    req: Request,
    res: Response
) => {

    try {

        const result =
            await service.generateSeatPlan(
                req.params.sessionId as string
            );

        res.json(result);

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const validateSeatPlan = async (
    req: Request,
    res: Response
) => {

    try {

        const result =
            await service.validateSeatPlan(
                req.params.sessionId as string
            );

        res.json({
            success: true,
            data: result
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};