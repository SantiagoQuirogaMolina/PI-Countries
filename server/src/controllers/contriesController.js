const axios = require("axios");
const URL = "http://localhost:5000/countries/";
const { activityM, countryM } = require("../db");
const { conn } = require("../db"); //coneccion sequelize
const { Op } = require("sequelize");

const cleanInfo = (infoArray) =>
  infoArray.map((countryInfo) => {
    const result = {
      id: countryInfo.cca3 || "NNCODIGOID", // Utilizar el ID del país como cca3
      name: countryInfo.name.common || "NNname",
      flagImage: countryInfo.flags?.png || "no-image", // Usar la URL de la bandera
      continent: countryInfo.region || "no-continent", // Usar la región como continente
      capital:
        Array.isArray(countryInfo.capital) && countryInfo.capital.length > 0
          ? countryInfo.capital[0]
          : "no-capital",
      subregion: countryInfo.subregion || null, // Subregión
      area: countryInfo.area || null,
      population: countryInfo.population || 0,
      latlng: countryInfo.latlng || [],
    };
    return result;
  });
const updateDatabaseWithApiCountries = async () => {
  console.log("Obteniendo datos de la API...");
  const response = await axios.get(URL);
  const apiCountries = response.data;
  const cleanedData = cleanInfo(apiCountries);
  console.log("verificadndo que el mdoelo exista ");
  console.log(countryM)
  for (const cleanedCountry of cleanedData) {
    if (cleanedCountry.id !== "NNCODIGOID") {
      await countryM.upsert(cleanedCountry);
    }
  }
  console.log("Base de datos actualizada con éxito.");
};

const getAllCountries = async () => {
  const CountriesDB = await countryM.findAll({
    include: [
      {
        model: activityM,
        as: "activities", // Alias para la relación
        // ... otras configuraciones de inclusión si las tienes
      },
    ],
  });
  return CountriesDB;
};
const getCountrieById = async (id) => {
  const country = await countryM.findByPk(id);
  return country;
};
const getCountrieByName = async (name) => {
  const country = await countryM.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`, // Búsqueda de coincidencia parcial insensible a mayúsculas/minúsculas
      },
    },
  });

  if (country.length === 0) {
    return [
      { message: "No se encontraron países que coincidan con la búsqueda." },
    ];
  }

  return country;
};

module.exports = {
  getAllCountries,
  updateDatabaseWithApiCountries,
  getCountrieById,
  getCountrieByName,
};
