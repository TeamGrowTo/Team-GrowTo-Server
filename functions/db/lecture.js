const convertSnakeToCamel = require('../lib/convertSnakeToCamel');
const format = require('pg-format');

const getLectureTotal = async (client) => {
  const { rowCount: totalNumber } = await client.query(
    `
    SELECT * FROM "lecture"
    `,
  );
  return { totalNumber };
};

const getLectures = async (client, categoryId, skillId, order) => {
  if (!order.column) {
    const { rows } = await client.query(
      `
      SELECT l.id as id, l.name as name, price, time, start_year, duration, review_time, has_preview, has_optional, url, t.name as tag_name
      FROM lecture as l, tag_lecture as tl, tag as t, review_time as rt
      WHERE l.id = tl.lecture_id and tl.tag_id = t.id and l.review_time_id = rt.id
      AND l.category_id = $1 and l.skill_id = $2
      ORDER BY l.name
      `,
      [categoryId, skillId]
    );
    return convertSnakeToCamel.keysToCamel(rows);

  }

  if (order.isDesc) {
    const sql = format(
      `
      SELECT l.id as id, l.name as name, price, time, start_year, duration, review_time, has_preview, has_optional, url, t.name as tag_name
      FROM lecture as l, tag_lecture as tl, tag as t, review_time as rt
      WHERE l.id = tl.lecture_id and tl.tag_id = t.id and l.review_time_id = rt.id
      AND l.category_id = %s and l.skill_id = %s
      ORDER BY %I DESC, l.name
      `, categoryId, skillId, order.column
    )
    const { rows } = await client.query(sql);
    return convertSnakeToCamel.keysToCamel(rows);
  } else {
    const sql = format(
      `
      SELECT l.id as id, l.name as name, price, time, start_year, duration, review_time, has_preview, has_optional, url, t.name as tag_name
      FROM lecture as l, tag_lecture as tl, tag as t, review_time as rt
      WHERE l.id = tl.lecture_id and tl.tag_id = t.id and l.review_time_id = rt.id
      AND l.category_id = %s and l.skill_id = %s
      ORDER BY %I, l.name
      `, categoryId, skillId, order.column
    )
    const { rows } = await client.query(sql);
    return convertSnakeToCamel.keysToCamel(rows);
  }
}

module.exports = {
  getLectureTotal,
  getLectures
};
