const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { requestDB } = require('../../../db');
const { slack } = require('../../../others/slack');

module.exports = async (req, res) => {
  let client;
  try {
    client = await db.connect(req);
    const requestNumber = await requestDB.getRequestTotal(client);
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_REQUEST_TOTAL_SUCCESS, requestNumber));
  } catch (error) {
    slack(req, error);
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
