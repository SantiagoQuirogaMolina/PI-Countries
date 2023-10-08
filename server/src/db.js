require("dotenv").config();
const { Sequelize } = require("sequelize");
const Countries = require("./models/Country");
const Activity = require("./models/Activity");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false,
  }
);

const countryM = Countries(sequelize);
const activityM = Activity(sequelize);

// Configura las relaciones
countryM.belongsToMany(activityM, {
  through: "CountryActivity",
  foreignKey: "countryId",
  as: "activities",
});

activityM.belongsToMany(countryM, {
  through: "CountryActivity",
  foreignKey: "activityId",
  as: "countries",
});

module.exports = {
  countryM,
  activityM,
  conn: sequelize,
};
