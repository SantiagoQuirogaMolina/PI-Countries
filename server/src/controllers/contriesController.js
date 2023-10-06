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
    };

    return result;
  });
const updateDatabaseWithApiCountries = async () => {
  const apiCountries = await getAllCountries();

  for (const apiCountry of apiCountries) {
    if (apiCountry.cca3 !== "NNCODIGOID" && apiCountry.cca3 !== null) {
      await countryM.upsert(apiCountry);
    }
  }
};
const getAllCountries = async () => {
  const CountriesDB = await countryM.findAll();
  const response = await axios.get(URL);
  const CountriesApi = response.data;

  const apii = cleanInfo(CountriesApi);

  return [...CountriesDB, ...apii];
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
