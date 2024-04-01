import { Service } from "typedi";
import winston from "winston";

export abstract class Logger {
    abstract getLoggerInstance(): any;
}

@Service({ transient: true })
export class WinstonLogger implements Logger {
    private loggerInstance: winston.Logger;

    constructor(private logFilePath: string) {
        this.loggerInstance = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.colorize({
                    colors: {
                        info: "blue",
                        warn: "yellow",
                        error: "red",
                    },
                })
            ),
            transports: [new winston.transports.File({ filename: this.logFilePath })],
        });
    }

    getLoggerInstance() {
        return this.loggerInstance;
    }
}
