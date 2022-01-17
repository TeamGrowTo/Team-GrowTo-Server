const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getFindTotal = async (client) => {
  const { rowCount: findNumber } = await client.query(
    `
    SELECT * FROM "find"
    `,
  );
  return { findNumber };
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
    SELECT id
    FROM tag
    where name = $1
    `,
    [tags[0]]
  )
  rows = query.rows
  const tagId1 = rows[0].id;

  query = await client.query(
    `
    SELECT id
    FROM tag
    where name = $1
    `,
    [tags[1]]
  );
  rows = query.rows
  const tagId2 = rows[0].id;

  query = await client.query(
    `
    INSERT INTO find(category_id, skill_id, tag_id, time_asc, price_asc)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [categoryId, skillId, [tagId1, tagId2], timeAsc, priceAsc]
  );
  rows = query.rows
  return convertSnakeToCamel.keysToCamel(rows[0]);
};


module.exports = {
  getFindTotal,
  insertSearchLecture,
};
