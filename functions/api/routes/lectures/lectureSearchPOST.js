const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { findDB } = require('../../../db');

module.exports = async (req, res) => {
    const { category, skill, tags, timeAsc, priceAsc } = req.body;
    if (!category || !skill || !tags || timeAsc === undefined || priceAsc === undefined) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    let client;
    try {
        client = await db.connect(req);
        const find = await findDB.insertSearchLecture(client, category, skill, tags, timeAsc, priceAsc);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ADD_SEARCH_SUCCESS, { id: find.id }));
    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};