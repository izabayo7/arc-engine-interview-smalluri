import express from "express";
import { dbClient } from "../db";
import { getUniqueShortCode } from "../utils/shortCodeGenerator";
import { validateUrlRetrievalRequest, validateUrlShorteningRequest } from "../middleware/request-validator";
import logger from "../utils/logger";
import { client } from '../utils/redis';
import { redisExpiry, shortCodeLength } from '../environment'; // default expiry is 24 hours since neither the url nor the short code is expected to change

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

router.post("/shorten", validateUrlShorteningRequest, async (req, res) => {
  const { url } = req.body;

  logger.info(`Received request to shorten URL: ${url}`);

  try {

    // Check cache first
    const cachedShortCode = await client.get(url);
    if (cachedShortCode) {
      logger.info(`Returning cached shortCode: ${cachedShortCode} for URL: ${url}`);
      return res.status(200).send({
        data: {
          shortCode: cachedShortCode,
          url,
        },
      });
    }

    const shortCode = await getUniqueShortCode(dbClient, shortCodeLength); // default length is 5
    logger.debug(`Generated shortCode for URL ${url}: ${shortCode}`);

    await dbClient.storeUrl(shortCode, url);
    logger.info(`Stored URL: ${url} with shortCode: ${shortCode}`);

    // cache the url
    await client.set(url, shortCode, { EX: redisExpiry });
    await client.set(shortCode, url, { EX: redisExpiry });

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

router.get("/:shortCode", validateUrlRetrievalRequest, async (req, res) => {
  const { shortCode } = req.params;

  logger.info(`Received request to retrieve original URL for shortCode: ${shortCode}`);

  try {

    // Check cache first
    const cachedUrl = await client.get(shortCode);
    if (cachedUrl) {
      logger.info(`Redirecting to cached URL: ${cachedUrl} for shortCode: ${shortCode}`);
      return res.redirect(cachedUrl);
    }

    const url = await dbClient.getUrl(shortCode);

    if (!url) {
      logger.warn(`No URL found for shortCode: ${shortCode}`);
      return res.sendStatus(404);
    }

    // Cache the result for next time
    await client.set(shortCode, url, { EX: redisExpiry });

    logger.info(`Redirecting to URL: ${url} for shortCode: ${shortCode}`);
    res.redirect(url);

  } catch (error: any) {
    logger.error(`Error retrieving URL for shortCode ${shortCode}: ${error.message}`);
    res.status(500).send({ error: 'Failed to retrieve the URL.' });
  }
});

router.delete("/:shortCode", validateUrlRetrievalRequest, async (req, res) => {
  const { shortCode } = req.params;

  logger.info(`Received request to delete shortCode: ${shortCode}`);

  try {

    // Check cache first
    const cachedUrl = await client.get(shortCode);
    if (cachedUrl) {
      logger.info(`Deleting cached URL: ${cachedUrl} for shortCode: ${shortCode}`);
      await client.del(shortCode);
      await client.del(cachedUrl);
    }

    const url = await dbClient.getUrl(shortCode);

    if (!url) {
      logger.warn(`No URL found for shortCode: ${shortCode}`);
      return res.sendStatus(404);
    }

    await dbClient.deleteUrl(shortCode);

    logger.info(`Deleted URL: ${url} for shortCode: ${shortCode}`);
    res.status(200).send({
      message: `Deleted URL: ${url} for shortCode: ${shortCode}`
    });

    return;

  } catch (error: any) {
    logger.error(`Error deleting URL for shortCode ${shortCode}: ${error.message}`);
    res.status(500).send({ error: 'Failed to delete the URL.' });
  }
});


export default router;
