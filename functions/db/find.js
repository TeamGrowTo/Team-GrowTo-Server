const getFindTotal = async (client) => {
  const { rowCount: findNumber } = await client.query(
    `
    SELECT * FROM "find"
    `,
  );
  return { findNumber };
};

module.exports = { getFindTotal };
