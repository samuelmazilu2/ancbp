const { Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('forms',  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phoneNo: Sequelize.STRING,
    message: Sequelize.STRING,
    location: Sequelize.STRING
  });
}