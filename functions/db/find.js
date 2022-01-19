const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getFindTotal = async (client) => {
  const { rowCount: findNumber } = await client.query(
    `
    SELECT * FROM "find"
    `,
  );
  return { findNumber };
};

const getSearchParams = async (client, findId) => {
  const { rows } = await client.query(
    `
    SELECT * from "find"
    WHERE id = $1
    `,
    [findId]
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
  getFindTotal,
  getSearchParams,
};
