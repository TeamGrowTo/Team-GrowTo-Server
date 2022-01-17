const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getComparingLecture = async (client) => {
  const { rows } = await client.query(
    `
        SELECT c.name , skill FROM comparing
        LEFT JOIN category c on c.id = comparing.category_id
        ORDER BY comparing.id
        LIMIT 6;
      `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getComparingLecture };


