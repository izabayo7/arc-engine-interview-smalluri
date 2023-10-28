import express from "express";
import { dbClient } from "../db";

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
    res.send(tables);
  });
});

router.use("/table/:tableName", (req, res) => {
  const { tableName } = req.params;
  void dbClient.getTableDescription(tableName).then((table) => {
    res.send(table);
  });
});

export default router;
