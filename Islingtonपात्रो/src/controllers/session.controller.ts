import { Request, Response } from "express";
import { CrudService } from "../services/crud.service";

const service = new CrudService();

export const getSessions = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.getAll("session");

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


export const getSession = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.getById(
            "session",
            "session_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        );

        res.json({
            success: true,
            data: data
        });

    } catch (error: any) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


export const createSession = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.create(
            "session",
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Session created successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const updateSession = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.update(
            "session",
            "session_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Session updated successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteSession = async (
    req: Request,
    res: Response
) => {

    try {

        await service.delete(
            "session",
            "session_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        );

        res.json({
            success: true,
            message: "Session deleted successfully"
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};