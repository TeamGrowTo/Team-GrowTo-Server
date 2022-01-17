const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { skillDB } = require('../../../db');

module.exports = async (req, res) => {
    let client;
    const { categoryId } = req.params;
    if (!categoryId) {
        console.log(error);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
        client = await db.connect(req);
        const skills = await skillDB.getSkillsByCategoryId(client, categoryId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_SKILLS_SUCCESS, skills));
    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};
