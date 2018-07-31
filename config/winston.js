import appRoot from "app-root-path";
import winston from "winston";

const options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: true
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: message => {
    logger.info(message);
  }
};

export default logger;
