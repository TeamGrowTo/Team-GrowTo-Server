const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { lectureDB, orderingDB } = require('../../../db');

module.exports = async (req, res) => {
    let client;
    const { categoryId, skillId } = req.params;
    let { ordering } = req.query;

    if (ordering == undefined) {
        ordering = "default";
    }
    ordering = ordering.toLowerCase();
    if (!(["fast", "slow", "price", "-price", "date", "repeat", "-repeat", "answer", "default"].includes(ordering))) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
    }

    try {
        client = await db.connect(req);
        const order = await orderingDB.getOrder(client, ordering);
        const lectures = await lectureDB.getLectures(client, categoryId, skillId, order)
        let i = 1;
        lectures[0].tags = [lectures[0].tagName];
        delete lectures[0].tagName;

        while (true) {
            if (lectures[i].id === lectures[i - 1].id) {
                lectures[i - 1].tags.push(lectures[i].tagName);
                lectures.splice(i, 1);
            } else {
                lectures[i].tags = [lectures[i].tagName];
                delete lectures[i].tagName;
                i++;
            }
            if (i === lectures.length) {
                break;
            }
        }

        if (!order.column) {
            lectures.sort(lecture => -lecture.tags.length)
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_REQUEST_RANK_SUCCESS, lectures));
    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};
