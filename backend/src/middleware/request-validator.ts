import { NextFunction, Request, Response } from "express";
import { urlRetrieveSchema, urlShortenSchema } from "../utils/validations";
import logger from "../utils/logger";

// Middleware for validating the body of the URL shortening request
export const validateUrlShorteningRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = urlShortenSchema.validate(req.body);
  if (error) {

    logger.error(`Error shortening URL ${req.body.url}: ${error.details[0].message}`);

    return res.status(400).send({
      message: error.details[0].message
    });
  }
  next();
};

// Middleware for validating the parameter of the URL retrieval request
export const validateUrlRetrievalRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = urlRetrieveSchema.validate(req.params);
  if (error) {

    logger.error(`Error retrieving URL for shortCode ${req.params.shortCode}: ${error.details[0].message}`);

    return res.status(400).send({
      message: error.details[0].message
    });
  }
  next();
};