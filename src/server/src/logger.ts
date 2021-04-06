const winston = require('winston');


const enumerateErrorFormat = winston.format((info:any) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});


const logger = winston.createLogger({
  level: process.env.ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }:any) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.File({ filename: 'api.log' }));
}

export default logger;