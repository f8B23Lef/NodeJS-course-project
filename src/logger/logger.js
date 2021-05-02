import { createLogger, format, transports } from 'winston';

const logFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} ${level}: ${stack || JSON.stringify(message)}`;
});

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    logFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
