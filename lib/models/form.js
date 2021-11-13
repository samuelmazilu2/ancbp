const { Sequelize, Model, DataTypes } = require('sequelize');
class Form extends Model {}
Form.init({
  Name: DataTypes.STRING,
  Email: DataTypes.STRING,
  Message: DataTypes.BLOB,
  Location: DataTypes.STRING,
  Date: DataTypes.DATE,
}, { sequelize, modelName: 'form' });
export default Form;