const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { skillDB } = require('../../../db');
const { slack } = require('../../../others/slack');

module.exports = async (req, res) => {
  let client;
  const { categoryId } = req.params;
  if (!categoryId) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  try {
    client = await db.connect(req);
    const skills = await skillDB.getSkillsByCategoryId(client, categoryId);
    let i;
    for (i = 0; i < skills.length; i++) {
      if (skills[i].name === '기타') {
        break;
      }
    }
    if (i !== skills.length) {
      const etcSkill = await skills.splice(i, 1)[0];
      await skills.push(etcSkill);
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_SKILLS_SUCCESS, skills));
  } catch (error) {
    slack(req, error);
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
