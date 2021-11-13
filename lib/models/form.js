const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH
  });
class Form extends Model {}
Form.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  message: DataTypes.STRING,
  location: DataTypes.STRING
}, { sequelize, modelName: 'form' });
module.exports = Form;