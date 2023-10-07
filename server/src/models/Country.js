const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Country = sequelize.define("Country", {
    id: {
      type: DataTypes.STRING(3), // Código de tres letras
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImage: {
      type: DataTypes.TEXT, // URL de la imagen de la bandera
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.FLOAT, // Área
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER, // Población
      allowNull: false,
    },
    latlng: {
      type: DataTypes.ARRAY(DataTypes.FLOAT), // Array de floats para latitud y longitud
      allowNull: true,
    },
  });
  return Country;
};
