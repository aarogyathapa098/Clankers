import { Request, Response } from "express";
import { CrudService } from "../services/crud.service";

const service = new CrudService();

export const getLecturers = async (req: Request, res: Response) => {

    try {

        const data = await service.getAll("lecturer");

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


export const getLecturer = async (req: Request, res: Response) => {

    try {

        const data = await service.getById(
            "lecturer",
            "lecturer_id",
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


export const createLecturer = async (req: Request, res: Response) => {

    try {

        const data = await service.create(
            "lecturer",
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Lecturer created successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const updateLecturer = async (req: Request, res: Response) => {

    try {

        const data = await service.update(
            "lecturer",
            "lecturer_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Lecturer updated successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteLecturer = async (req: Request, res: Response) => {

    try {

        await service.delete(
            "lecturer",
            "lecturer_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        );

        res.json({
            success: true,
            message: "Lecturer deleted successfully"
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};