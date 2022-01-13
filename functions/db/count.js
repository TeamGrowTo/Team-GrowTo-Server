const _ = require('lodash');

const getLectureTotal = async (client) => {
  const { rowCount: totalNumber } = await client.query(
    `
    SELECT COUNT(*) FROM "lecture"
    `,
  );

  return { totalNumber };
};

module.exports = { getLectureTotal };
