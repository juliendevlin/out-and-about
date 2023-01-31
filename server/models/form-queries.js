module.exports = {
  selectActivities:`
    SELECT *
    FROM activities
  `,

  selectTypes:`
    SELECT 
      types._id,
      types.type,
      types.convention,
      activities.activity

    FROM types
      INNER JOIN activities ON activities._id = types.activity_id
  `,

  selectDifficulties:`
    SELECT
      difficulties._id,
      difficulties.difficulty,
      types.type

    FROM difficulties
      INNER JOIN types ON types._id = difficulties.type_id
  `
}