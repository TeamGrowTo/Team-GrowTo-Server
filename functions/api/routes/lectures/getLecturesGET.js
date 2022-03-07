const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { lectureDB, orderingDB } = require('../../../db');
const { slack } = require('../../../others/slack');

module.exports = async (req, res) => {
  let client;
  const { categoryId, skillId } = req.params;
  let { ordering } = req.query;

  if (ordering === undefined) {
    ordering = 'default';
  }
  ordering = ordering.toLowerCase();
  if (!['fast', 'slow', 'price', '-price', 'date', 'repeat', '-repeat', 'answer', 'default'].includes(ordering)) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
  }

  try {
    client = await db.connect(req);
    const order = await orderingDB.getOrder(client, ordering);
    let lectures = await lectureDB.getLectures(client, categoryId, skillId, order);
    const setTagList = async (lectures, idx) => {
      lectures[idx].tags = [lectures[idx].tagName];
      delete lectures[idx].tagName;
      return lectures;
    };

    lectures = await setTagList(lectures, 0);
    let i = 1;

    for (;;) {
      if (lectures[i].id === lectures[i - 1].id) {
        await lectures[i - 1].tags.push(lectures[i].tagName);
        await lectures.splice(i, 1);
      } else {
        lectures = await setTagList(lectures, i);
        i++;
      }
      if (i === lectures.length) {
        break;
      }
    }

    lectures.sort((lecture1, lecture2) => {
      if (lecture1.name.toUpperCase < lecture2.name.toUpperCase) {
        return -1;
      }
      if (lecture1.name.toUpperCase > lecture2.name.toUpperCase) {
        return 1;
      }
      return 0;
    });

    if (!order.column) {
      lectures.sort((lecture1, lecture2) => -(lecture1.tags.length - lecture2.tags.length));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_LECTURES_SUCCESS, lectures));
  } catch (error) {
    slack(req, error);
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
