const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Activity = sequelize.define("Activity", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    duration: {
      type: DataTypes.FLOAT, 
      allowNull: true,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Verano", "Otoño", "Invierno", "Primavera"]],
      },
    },
  });

  return Activity;
};
