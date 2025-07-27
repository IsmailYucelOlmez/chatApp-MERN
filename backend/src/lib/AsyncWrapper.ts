import { Request, Response } from "express";
import ResponseClass from "./Response";
import { CustomErrorType } from "./Error";
import { DEFAULT_LANG } from "../config/config";

export const asyncWrapper = (fn: Function) => {
    return async (req: Request, res: Response, next: Function) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            const errorResponse = ResponseClass.errorResponse(err as CustomErrorType, DEFAULT_LANG);
            res.status(errorResponse.code).json(errorResponse);
        }
    };
};