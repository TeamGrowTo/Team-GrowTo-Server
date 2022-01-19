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

module.exports = {
    getSkill,
};
