const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getOrder = async (client, orderName) => {
    const { rows } = await client.query(
        `
        SELECT * 
        FROM ordering
        WHERE "order" = $1
        `,
        [orderName]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
    getOrder
};
