const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getRankRequestLecture = async (client) => {
    const { rows } = await client.query(
        `
        SELECT c.name , skill ,number FROM ranking
        LEFT JOIN category c on c.id = ranking.category_id
        LIMIT 8;
        `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getRankRequestLecture };
