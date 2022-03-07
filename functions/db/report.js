const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addReport = async (client, reasonId, lecture, explanation, email) => {
  const { rows } = await client.query(
    `
    INSERT INTO report
    (explanation, email, lecture, reason_id)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [explanation, email, lecture, reasonId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { addReport };
