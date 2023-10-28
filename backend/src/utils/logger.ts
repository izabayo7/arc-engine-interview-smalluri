import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

// Custom format
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// DailyRotateFile transport configuration
const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'debug',
  filename: 'logs/application-%DATE%.log', // This will create files like `application-2023-10-28.log`
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '90d', // Keep logs for 3 months
});

const logger = createLogger({
  format: combine(
    timestamp(),
    customFormat
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(
        format.colorize(),
        timestamp(),
        customFormat
      )
    }),
    dailyRotateFileTransport
  ]
});

export default logger;
