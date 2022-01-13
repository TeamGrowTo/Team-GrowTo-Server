const getLectureTotal = async (client) => {
  const { rowCount: totalNumber } = await client.query(
    `
    SELECT * FROM "lecture"
    `,
  );
  return { totalNumber };
};

module.exports = { getLectureTotal };
