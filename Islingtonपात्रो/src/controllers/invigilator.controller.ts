import { Request, Response } from "express";
import { InvigilatorService } from "../services/invigilator.service";

const service = new InvigilatorService();

export const generateInvigilators = async (
    req: Request,
    res: Response
) => {

    try {

        const result =
            await service.generateInvigilators(
                Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId
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