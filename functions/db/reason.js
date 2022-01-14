const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getReasons = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "reason"
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getReasons };
