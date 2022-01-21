const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { categoryDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;
  try {
    client = await db.connect(req);
    const categories = await categoryDB.getAllCategories(client);
    let i;
    for (i = 0; i < categories.length; i++) {
      if (categories[i].name === "기타") {
        break
      }
    }
    if (i !== categories.length) {
      const etcCategory = await categories.splice(i, 1)[0];
      await categories.push(etcCategory);
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_CATEGORIES_SUCCESS, categories));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
