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


/*
(case when ASCII(SUBSTRING(tag.name,1)) = 32 then 4 
          when ASCII(SUBSTRING(tag.name,1)) = 0 then 4
          when (ASCII(SUBSTRING(tag.name,1)) >= 48 and ASCII(SUBSTRING(tag.name,1)) <= 57) then 3 
          when ASCII(SUBSTRING(tag.name,1)) < 128 then 2
          else 1 end), binary(tag.name)       
          `,
*/