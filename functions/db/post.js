const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');


const postInsertRequestLecture = async (client, categoryid ,skill, email) => {
    const { rows } = await client.query(
        `INSERT INTO request
        (category_id, skill, email)
        VALUES
        ($1,$2,$3)
        RETURNING *
        `,
        [categoryid, skill, email],
    );
    return convertSnakeToCamel.keysToCamel(rows);
};



module.exports = { postInsertRequestLecture};
