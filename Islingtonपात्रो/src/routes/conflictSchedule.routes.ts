import { Request, Response } from "express";
import { ConflictService } from "../services/conflict.service";

const service = new ConflictService();

export const getConflicts = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.getAllConflicts();

        res.json({
            success: true,
            data: data
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const checkConflict = async (
    req: Request,
    res: Response
) => {

    try {

        const conflicts =
            await service.checkSessionConflict(req.body);

        res.json({
            success: true,
            has_conflict: conflicts.length > 0,
            conflicts: conflicts
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const resolveConflict = async (
    req: Request,
    res: Response
) => {

    try {

        const data =
            await service.resolveConflict(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);

        res.json({
            success: true,
            message: "Conflict resolved successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};