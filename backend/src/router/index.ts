import express from "express";
import { dbClient } from "../db";
import { getUniqueShortCode } from "../utils/shortCodeGenerator";
import { validateUrlRetrievalRequest, validateUrlShorteningRequest } from "../middleware/request-validator";
import logger from "../utils/logger";
//
// Make whatever changes you need to make the router work how you need it
// to. This is just a basic example; you can add more routes, middleware,
// etc. Also, feel free to remove any routes you don't need, or that you
// think should not exist.
//

/**
 * The main router for the backend.
 */
const router = express.Router();

router.use("/tables", (req, res) => {
  void dbClient.getTableNames().then((tables) => {
    res.send({
      data: tables,
    });
  });
});

router.use("/table/:tableName", (req, res) => {
  const { tableName } = req.params;
  void dbClient.getTableDescription(tableName).then((table) => {
    res.send({
      data: table,
    });
  });
});

router.use("/shorten", validateUrlShorteningRequest, async (req, res) => {
  const { url } = req.body;

  logger.info(`Received request to shorten URL: ${url}`);

  try {
    const shortCode = await getUniqueShortCode(dbClient, parseInt(process.env.SHORT_CODE_LENGTH ?? "5")); // default length is 5
    logger.debug(`Generated shortCode for URL ${url}: ${shortCode}`);

    await dbClient.storeUrl(shortCode, url);
    logger.info(`Stored URL: ${url} with shortCode: ${shortCode}`);

    res.status(201).send({
      data: {
        shortCode,
        url,
      },
    });
  } catch (error: any) {
    logger.error(`Error shortening URL ${url}: ${error.message}`);
    res.status(500).send({ error: 'Failed to shorten the URL.' });
  }
});

router.use("/:shortCode", validateUrlRetrievalRequest, async (req, res) => {
  const { shortCode } = req.params;

  logger.info(`Received request to retrieve original URL for shortCode: ${shortCode}`);

  try {
    const url = await dbClient.getUrl(shortCode);

    if (!url) {
      logger.warn(`No URL found for shortCode: ${shortCode}`);
      return res.sendStatus(404);
    }

    logger.info(`Redirecting to URL: ${url} for shortCode: ${shortCode}`);
    res.redirect(url);
  } catch (error: any) {
    logger.error(`Error retrieving URL for shortCode ${shortCode}: ${error.message}`);
    res.status(500).send({ error: 'Failed to retrieve the URL.' });
  }
});


export default router;
