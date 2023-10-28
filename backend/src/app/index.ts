import express from "express";
import router from "../router";
import errorHandler from "../middleware/error-handler";
import { logRequest } from "../middleware/logger";
import { client } from "../utils/redis";
import logger from "../utils/logger";
const cron = require('node-cron');
import { dbClient } from "../db";
import { deleteUrlAfter } from "../environment";

//
// This is where the Express application is instantiated and configured.
// Feel free to change this file however you need to.
//

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(logRequest);
app.use(router);
app.use(errorHandler);

client.connect();

// Runs daily at midnight
cron.schedule('0 0 * * *', async ()=>{
    logger.info(`Running cron job to delete expired urls`);

    dbClient.deleteExpiredUrls(deleteUrlAfter);
    

});


export default app;
