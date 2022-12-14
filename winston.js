const winston = require('winston');

let logger = winston.createLogger({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: './logs/filelog-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: './logs/filelog-error.log',
            level: 'error'
        }),
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new (winston.transports.Console)({
            level: 'info'
        })
    ]
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};