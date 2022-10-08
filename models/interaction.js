'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Interaction.init({
    customerId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Interaction',
    timestamps: true
  });
  return Interaction;
};