const { Sequelize } = require('sequelize');
const logger = require('./logger');
const { default: Form } = require('./models/form');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH
  });
  
 const createNewForm = async ({name, email, message, location}) => {
  await sequelize.sync();
  try{
    const form = await Form.create({
        name,
        email,
        location,
        message
      });
  }catch(ex){
      logger.error(ex);
  }
  logger.info(`New form created`);
  logger.info({name, email, message, location});
};
module.exports = {
    createNewForm
}