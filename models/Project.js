const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}
//we will use this model for listings
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Project;
