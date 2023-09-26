const {  activityM, countryM } = require("../db");
// Asegúrate de importar tus modelos correctamente

const createActivity = async (activityData) => {
  try {
    const { name, difficulty, duration, season, countries } = activityData;
    const newActivity = await activityM.create({
      name,
      difficulty,
      duration,
      season,
      countries
    });
    if (countries && countries.length > 0) {
        
      const countriesToRelate = await countryM.findAll({
        where: {
          id: countries,
        },
      });
  await newActivity.setCountries(countriesToRelate);
    }
    return newActivity;
  } catch (error) {
    throw error; 
  }
};
const getAllActivities = async () => {

    const activitiesDB = await activityM.findAll();
    return [...activitiesDB];
  };
module.exports = {
  createActivity,
  getAllActivities
  
};
