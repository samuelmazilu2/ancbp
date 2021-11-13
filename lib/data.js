const { Sequelize } = require('sequelize');
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
        message,
        date: new Date()
      });
  }catch(ex){
      console.log(JSON.stringify(ex));
  }
  
  console.log(`New form created`);
  console.log(form);
};
module.exports = {
    createNewForm
}