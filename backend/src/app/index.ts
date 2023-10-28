import express from "express";
import router from "../router";
import errorHandler from "../middleware/error-handler";

//
// This is where the Express application is instantiated and configured.
// Feel free to change this file however you need to.
//

const app = express();
app.disable("x-powered-by");
app.use(router);
app.use(errorHandler);

export default app;
