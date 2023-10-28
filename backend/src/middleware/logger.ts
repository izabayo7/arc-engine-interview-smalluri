import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

// Middleware for logging the incoming request
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  if (Object.keys(req.body).length) {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  }
  next();
};