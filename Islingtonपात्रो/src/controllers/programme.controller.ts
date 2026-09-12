import { Request, Response } from "express";
import { CrudService } from "../services/crud.service";

const service = new CrudService();

export const getProgrammes = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.getAll("programme");

        res.status(200).json({
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


export const getProgramme = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.getById(
            "programme",
            "programme_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        );

        res.status(200).json({
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


export const createProgramme = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.create(
            "programme",
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Programme created successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const updateProgramme = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await service.update(
            "programme",
            "programme_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Programme updated successfully",
            data: data
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteProgramme = async (
    req: Request,
    res: Response
) => {

    try {

        await service.delete(
            "programme",
            "programme_id",
            Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Programme deleted successfully"
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};