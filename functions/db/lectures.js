const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getRankRequestLecture = async (client) => {
    const { rows } = await client.query(
        `SELECT c.name,skill, COUNT(skill) AS number FROM request
            LEFT JOIN category c on c.id = request.category_id
         GROUP BY  c.name,skill
         HAVING COUNT(skill) < 100
         ORDER BY number DESC
         LIMIT 8;
        `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
};




module.exports = {
    getRankRequestLecture, 
   };



