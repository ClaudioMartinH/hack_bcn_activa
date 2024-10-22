import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";

const handleZodError = (res: Response, error: z.ZodError) => {

    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message
    }))

    return res.status(BAD_REQUEST).json({
        message: error.message,
        errors
    })
}

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error)

    if ( error instanceof z.ZodError ){
        handleZodError(res, error)
    }else if(error instanceof AppError) {
         handleAppError(res, error)
    }else {
      res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
}

export default errorHandler