const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { compareDB } = require('../../../db');
const { slack } = require('../../../others/slack');

module.exports = async (req, res) => {
  let client;
  try {
    client = await db.connect(req);
    const compareLecture = await compareDB.getComparingLecture(client);
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_COMPARE_SUCCESS, compareLecture));
  } catch (error) {
    slack(req, error);
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
