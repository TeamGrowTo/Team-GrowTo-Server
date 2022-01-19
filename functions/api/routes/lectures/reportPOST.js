const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { reportDB } = require('../../../db');

module.exports = async (req, res) => {
  const { reasonId, lecture, explanation, email } = req.body;

  if (!reasonId || !lecture || !email || explanation === undefined) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  let client;
  try {
    client = await db.connect(req);
    const report = await reportDB.addReport(client, reasonId, lecture, explanation, email);
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ADD_REPORT_SUCCESS, report));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
