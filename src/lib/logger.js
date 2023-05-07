// logger.js
const winston = require('winston');
// import BrowserConsole from './browserConsole';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'menumenu.log' }),
  ],
  
});


module.exports = logger;