import { ErrorRequestHandler } from "express-serve-static-core";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  
  logger.error(err);

  res.status(err.statusCode ?? 500);
  res.set(err.headers ?? {});
  typeof err.toJSON === "function"
    ? res.json(err)
    : res.send(err.message ?? err.body ?? err);
};

export default errorHandler;
