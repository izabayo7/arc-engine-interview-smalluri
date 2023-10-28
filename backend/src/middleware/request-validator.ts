import { NextFunction, Request, Response } from "express";
import { urlRetrieveSchema, urlShortenSchema } from "../utils/validations";

// Middleware for validating the body of the URL shortening request
export const validateUrlShorteningRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = urlShortenSchema.validate(req.body);
  if (error) {
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
    return res.status(400).send({
      message: error.details[0].message
    });
  }
  next();
};