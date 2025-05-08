import winston from "winston";
import 'winston-daily-rotate-file';
import path from "path";

const logDir = 'logs'

const transport = new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'app-%DATE%.log'), 
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    level: 'info',
})

export const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.json()
    ), 
    transports: [
        transport, 
        new winston.transports.Console()
    ]
})