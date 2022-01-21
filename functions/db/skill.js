const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getSkill = async (client, id) => {
    const { rows } = await client.query(
        `
        SELECT id, name
        FROM skill
        WHERE id = $1
        `,
        [id]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getSkillsByCategoryId = async (client, categoryId) => {
    const { rows } = await client.query(
        `
        SELECT id, name
        FROM skill
        WHERE category_id = $1
        ORDER BY name
        `,
        [categoryId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = {
    getSkill,
    getSkillsByCategoryId,
};
