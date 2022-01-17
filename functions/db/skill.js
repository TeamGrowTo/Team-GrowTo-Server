const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getSkillsByCategoryId = async (client, categoryId) => {
    const { rows } = await client.query(
        `
      SELECT *
      FROM skill
      WHERE category_id = $1
      `,
        [categoryId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = {
    getSkillsByCategoryId,
};