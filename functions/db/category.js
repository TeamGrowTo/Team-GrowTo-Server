const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllCategories = async (client) => {
  const { rows } = await client.query(
    `
    SELECT *
    FROM category
    ORDER BY name
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getCategory = async (client, id) => {
  const { rows } = await client.query(
    `
    SELECT *
    FROM category
    WHERE id = $1
    `,
    [id]
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
  getAllCategories,
  getCategory,
};
