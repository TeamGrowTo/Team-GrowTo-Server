const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getSkillTags = async (client, skillId) => {
  const { rows } = await client.query(
    `
    SELECT tag.id, tag.name FROM tag
    LEFT JOIN skill s on s.id = tag.skill_id
    WHERE skill_id = $1
    ORDER BY tag.name collate "ko_KR.utf8";
    `,
    [skillId],
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getSkillTags };
