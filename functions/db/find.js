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

const insertSearchLecture = async (client, category, skill, tags, timeAsc, priceAsc) => {
  let { rows } = await client.query(
    `
    SELECT id
    FROM category
    where name = $1
    `,
    [category]
  );
  const categoryId = rows[0].id;

  let query = await client.query(
    `
    SELECT id
    FROM skill
    where name = $1
    `,
    [skill]
  )
  rows = query.rows
  const skillId = rows[0].id;

  query = await client.query(
    `
    INSERT INTO find(category_id, skill_id, tag_name, time_asc, price_asc)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [categoryId, skillId, tags, timeAsc, priceAsc]
  );
  rows = query.rows
  return convertSnakeToCamel.keysToCamel(rows[0]);
};


module.exports = {
  getFindTotal,
  getSearchParams,
  insertSearchLecture,
};
