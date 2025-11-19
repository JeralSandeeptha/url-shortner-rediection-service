import logger from "../../utils/logger";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../../types/enums/HttpStatus";
import { RequestHandler } from "express";
import { UrlModel } from "../models/Url";
import SuccessResponse from "../../utils/SuccessResponse";

export const redirectToLongUrlController: RequestHandler = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const url = await UrlModel.findOne({ short_url: shortId });

    if (!url) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(
          new ErrorResponse(
            HTTP_STATUS.NOT_FOUND,
            "Redirect url query was failed",
            "Short URL not found"
          )
        );
    }

    if (url.status === "inactive") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json(
          new ErrorResponse(
            HTTP_STATUS.FORBIDDEN,
            "Redirect not allowed",
            "This link is inactive and cannot be accessed"
          )
        );
    }

    url.clicks += 1;
    await url.save();

    logger.info("Redirecting to long URL");
    return res.status(HTTP_STATUS.ACCEPTED).json(
      new SuccessResponse(
        HTTP_STATUS.ACCEPTED,
        "Redirect url query was success",
        { long_url: url.long_url }
      )
    );
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Redirect url query internal server error",
          error
        )
      );
  }
};
