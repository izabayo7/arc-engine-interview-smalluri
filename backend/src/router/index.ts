import express from "express";
import { dbClient } from "../db";
import { getUniqueShortCode } from "../utils/shortCodeGenerator";
import { validateUrlRetrievalRequest, validateUrlShorteningRequest } from "../middleware/request-validator";

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

  const shortCode = await getUniqueShortCode(dbClient, parseInt(process.env.SHORT_CODE_LENGTH ?? "5")); // default length is 5, since we can theoretically store up to 916,132,832 unique URLs using a 5-length shortCode

  void dbClient.storeUrl(shortCode, url).then(() => {
    res.status(201).send({
      data: {
        shortCode,
        url,
      },
    });
  });
});

router.use("/:shortCode", validateUrlRetrievalRequest, async (req, res) => {
  const { shortCode } = req.params;
  const url = await dbClient.getUrl(shortCode);

  if (!url) {
    return res.sendStatus(404);
  }

  res.redirect(url);
});

export default router;
