const { Sequelize } = require('sequelize');
const logger = require('./logger');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "local.db"
});
const Form = require('./models/form')(sequelize);
const File = require('./models/file')(sequelize);
File.belongsTo(Form); 

const createNewForm = async ({ name, email, message, phone, location, city, county }) => {
    logger.debug(`Creating new form`);
    await sequelize.sync();
    let form = null;
    try {
        logger.debug(`await Form.create`);
        form = await Form.create({
            name: name,
            email: email,
            phoneNo: phone,
            location: location,
            message: message,
            city: city,
            county: county
        });
    } catch (ex) {
        logger.error(ex);
    }
    logger.info(`New form created`);
    logger.info(form);
    return form;
};
const createNewFile = async({name, data, formId}) => {
    logger.debug(`Creating new file`);
    await sequelize.sync();
    try {
        logger.debug(`await File.create`);
        const form = await File.create({
            name: name,
            data: data,
            formId: formId
        });
    } catch (ex) {
        logger.error(ex);
    }
    logger.info(`New file created`);
    logger.info({ name });
}
module.exports = {
    createNewForm,
    createNewFile
}