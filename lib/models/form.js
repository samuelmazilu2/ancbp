const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH
  });
class Form extends Model {}
Form.init({
  Name: DataTypes.STRING,
  Email: DataTypes.STRING,
  Message: DataTypes.BLOB,
  Location: DataTypes.STRING,
  Date: DataTypes.DATE,
}, { sequelize, modelName: 'form' });
module.exports = Form;