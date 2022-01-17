const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getSkillsByCategoryId = async (client, categoryId) => {
    const { rows } = await client.query(
        `
      SELECT id, name
      FROM skill
      WHERE category_id = $1
      ORDER BY id
      `,
        [categoryId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = {
    getSkillsByCategoryId,
};