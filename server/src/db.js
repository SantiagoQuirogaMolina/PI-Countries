require("dotenv").config();
const { Sequelize } = require("sequelize");
const Countries = require("./models/Country")
const Activiry = require("./models/Activity")


const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, 

});

const  countryM  = Countries(sequelize);
const  activityM  = Activiry(sequelize);



// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// ...

countryM.hasMany(activityM, {
  foreignKey: "countryId",
  as: "activities", // Nombre de la relación
});

// ...

activityM.belongsTo(countryM, {
  foreignKey: "countryId",
});


module.exports = {
  countryM,
  activityM,
conn: sequelize,    // para importart la conexión { conn } = require('./db.js');
};