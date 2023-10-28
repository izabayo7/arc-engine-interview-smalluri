import { ErrorRequestHandler } from "express-serve-static-core";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error(err);

  res.status(err.statusCode ?? 500);
  res.set(err.headers ?? {});
  typeof err.toJSON === "function"
    ? res.json(err)
    : res.send(err.message ?? err.body ?? err);
};

export default errorHandler;
