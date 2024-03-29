const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { tagDB } = require('../../../db');
const { slack } = require('../../../others/slack');

module.exports = async (req, res) => {
  const { skillId } = req.params;

  let client;
  try {
    client = await db.connect(req);
    const skillTags = await tagDB.getSkillTags(client, skillId);
    if (skillTags.length === 0) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.READ_NO_TAGS));
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_TAGS_SUCCESS, skillTags));
  } catch (error) {
    slack(req, error);
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
