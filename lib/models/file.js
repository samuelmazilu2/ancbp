const { Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('file',  {
    name: Sequelize.STRING,
    uuid: Sequelize.STRING,
    data:  Sequelize.BLOB('long')
  });

}