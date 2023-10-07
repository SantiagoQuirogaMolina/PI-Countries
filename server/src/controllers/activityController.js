const { activityM, countryM } = require("../db");
// Asegúrate de importar tus modelos correctamente

const createActivity = async (activityData) => {
  try {
    const { name, difficulty, duration, season, selectedCountries } =
      activityData;

    const newActivity = await activityM.create({
      name,
      difficulty,
      duration,
      season,
      selectedCountries,
    });

    if (selectedCountries) {
      const countriesToRelate = await countryM.findAll({
        where: {
          id: selectedCountries,
        },
      });
      await newActivity.addCountries(countriesToRelate);
    }
    return newActivity;
  } catch (error) {
    throw error;
  }
};
const getAllActivities = async () => {
  const activitiesDB = await activityM.findAll({
    include: [
      {
        model: countryM,
        as: "countries", // Alias para la relación
        // ... otras configuraciones de inclusión si las tienes
      },
    ],
  });
  return activitiesDB;
};
module.exports = {
  createActivity,
  getAllActivities,
};
