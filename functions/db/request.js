const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const postInsertRequestLecture = async (client, categoryId, skill, email) => {
  const { rows } = await client.query(
    `INSERT INTO request
    (category_id, skill, email)
    VALUES
    ($1,$2,$3)
    RETURNING *
    `,
    [categoryId, skill, email],
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getRequestTotal = async (client) => {
  const { rowCount: requestNumber } = await client.query(
    `
    SELECT * FROM "request"
    `,
  );
  return { requestNumber };
};

module.exports = {
  postInsertRequestLecture,
  getRequestTotal,
};
