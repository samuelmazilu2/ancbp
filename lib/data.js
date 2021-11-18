const { Sequelize } = require('sequelize');
const logger = require('./logger');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "local.db"
});
const Form = require('./models/form')(sequelize);
const createNewForm = async ({ name, email, message, phone, location }) => {
    logger.debug(`Creating new form`);
    await sequelize.sync();
    try {
        logger.debug(`await Form.create`);
        const form = await Form.create({
            name: name,
            email: email,
            phoneNo: phone,
            location: location,
            message: message
        });
    } catch (ex) {
        logger.error(ex);
    }
    logger.info(`New form created`);
    logger.info({ name, email, phone, message, location });
};
module.exports = {
    createNewForm
}