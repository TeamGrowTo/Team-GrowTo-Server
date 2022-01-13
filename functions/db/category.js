const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllCategories = async (client) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM category
        ORDER BY id
        `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = {
    getAllCategories,
};
