const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { findDB, lectureDB, categoryDB, skillDB } = require('../../../db');
const { slack } = require('../../../others/slack');

module.exports = async (req, res) => {
  let client;
  const { findId } = req.params;
  try {
    client = await db.connect(req);
    const searchParams = await findDB.getSearchParams(client, findId);
    if (!searchParams) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
    }
    let lectures = await lectureDB.getLecturesFromIds(client, searchParams.categoryId, searchParams.skillId);

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

    const lecturesHasTags = [];
    for (let j = 0; j < lectures.length; j++) {
      for (let name of searchParams.tagName) {
        if (lectures[j].tags.includes(name)) {
          if (lectures[j].tagScore) {
            lectures[j].tagScore += 1;
          } else {
            lectures[j].tagScore = 1;
            lectures[j].score = 0;
            lecturesHasTags.push(lectures[j]);
          }
        }
      }
    }
    lecturesHasTags.sort((lecture) => -lecture.tagScore);
    if (lecturesHasTags.length === 0) {
      return res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, responseMessage.NO_CONTENTS));
    }

    if (searchParams.timeAsc !== null) {
      if (searchParams.timeAsc) {
        lecturesHasTags.sort((lecture1, lecture2) => lecture1.time - lecture1.tagScore / 1000 - (lecture2.time - lecture2.tagScore / 1000));
      } else {
        lecturesHasTags.sort((lecture1, lecture2) => -lecture1.time - lecture1.tagScore / 1000 - (-lecture2.time - lecture2.tagScore / 1000));
      }
    }

    for (let j = 0, k = 5; j < lecturesHasTags.length && k > 0; j++, k--) {
      lecturesHasTags[j].score += k;
    }

    if (searchParams.priceAsc !== null) {
      if (searchParams.timeAsc) {
        lecturesHasTags.sort((lecture1, lecture2) => lecture1.price - lecture1.tagScore / 1000 - (lecture2.price - lecture2.tagScore / 1000));
      } else {
        lecturesHasTags.sort((lecture1, lecture2) => -lecture1.price - lecture1.tagScore / 1000 - (-lecture2.price - lecture2.tagScore / 1000));
      }
    }

    for (let j = 0, k = 5; j < lecturesHasTags.length && k > 0; j++, k--) {
      lecturesHasTags[j].score += k;
    }
    lecturesHasTags.sort((lecture1, lecture2) => -lecture1.score - lecture1.tagScore * 1000 - (-lecture2.score - lecture2.tagScore * 1000));
    lecturesHasTags.slice(0, 3);
    for (let lecture of lecturesHasTags) {
      delete lecture.score;
      delete lecture.tagScore;
    }

    const category = await categoryDB.getCategory(client, searchParams.categoryId);
    const skill = await skillDB.getSkill(client, searchParams.skillId);

    lectures = lecturesHasTags;

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_RECOMMEND_SUCCESS, { lectures, category, skill }));
  } catch (error) {
    slack(req, error);
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
