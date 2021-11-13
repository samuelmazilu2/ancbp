const log4js = require('log4js');
const logPath = process.env.LOG_PATH;

// init logger, with level set according to the environment (dev/prod)
log4js.configure({
  appenders: {
    text: { type: 'file', filename: `${logPath}/appLog.txt` },
    console: { type: 'console' },
  },
  categories: {
    default: {
      appenders: ['console', 'text'],
      level: "DEBUG",
    },
  },
});

module.exports = log4js.getLogger();