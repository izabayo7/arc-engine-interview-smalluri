import serverlessHttp from "serverless-http";
import app from "./app";

export default app;
export const serverless = serverlessHttp(app);
