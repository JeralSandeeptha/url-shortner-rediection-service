import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../../types/enums/HttpStatus";
import { RequestHandler } from "express";

const getApplication: RequestHandler = (_req, res) => {
    try {
        logger.info("Welcome to Redirect Service API");
        console.log("Welcome to Redirect Service API");
        res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Redirect Service API checking query was success",
                "Redirect Service API checking query was success"
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        console.log(error.message);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Redirect Service API checking query was failed",
                error
            )
        );
    }
}

export default getApplication;