import { Service } from "typedi";
import winston from "winston";
import path from "path";

export abstract class Logger {
    abstract info(message: string): void;
    abstract warn(message: string): void;
    abstract error(message: string): void;
}

@Service({ transient: true })
export class WinstonLogger implements Logger {
    private loggerInstance: winston.Logger;

    constructor(private readonly testFilename: string) {
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
            transports: [
                new winston.transports.File({
                    filename: path.join(process.cwd(), "logs", `${this.testFilename}.log`),
                }),
            ],
        });
    }

    info(message: string): void {
        this.loggerInstance.info(message);
    }

    warn(message: string): void {
        this.loggerInstance.warn(message);
    }

    error(message: string): void {
        this.loggerInstance.error(message);
    }
}
