const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getComparingLecture = async (client) => {
    const { rows } = await client.query(
        `
        SELECT c.name,skill FROM request
        LEFT JOIN category c on c.id = request.category_id
        GROUP BY  c.name,skill
        HAVING COUNT(skill) >=100
        ORDER BY COUNT(skill) DESC
        LIMIT 6;
      `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getComparingLecture };


