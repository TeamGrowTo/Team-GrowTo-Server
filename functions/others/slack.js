const slackAPI = require('./slackAPI');
const error = require('console');

const slack = (req, message) => {
  const slackMessage = `[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl} ${message} 
    ${JSON.stringify(error)}`;
  slackAPI.sendMessageToSlack(slackMessage, slackAPI.DEV_WEB_HOOK_ERROR_MONITORING);
};

module.exports = { slack };
