const { Sequelize } = require('sequelize');
const logger = require('./logger');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "local.db"
});
const Form = require('./models/form')(sequelize);
const File = require('./models/file')(sequelize);
const uuid = require('uuid');
File.belongsTo(Form); 
const alterDB = process.env.ALTER_DB || false;
const createNewForm = async ({ name, email, message, phone, location, city, county, uuid }) => {
    logger.debug(`Creating new form`);
    await sequelize.sync({alter:alterDB, force:true});
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
            county: county,
            uuid: uuid
        });
    } catch (ex) {
        logger.error(ex);
    }
    logger.info(`New form created`);
    logger.info(form);
    return form;
};
const getFile = async(uuid) => {
    return await File.findOne({ where: { uuid: uuid } });
}
const createNewFile = async({name, data, formId}) => {
    logger.debug(`Creating new file`);
    let file = null;
    await sequelize.sync({alter: alterDB, force: true});
    try {
        logger.debug(`await File.create`);
        file = await File.create({
            name: name,
            data: data,
            uuid: uuid.v4(),
            formId: formId
        });
    } catch (ex) {
        logger.error(ex);
    }
    logger.info(`New file created`);
    logger.info({ name });
    return file;
}
module.exports = {
    createNewForm,
    createNewFile,
    getFile
}