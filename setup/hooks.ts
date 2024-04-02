import Container from "typedi";
import { WinstonLogger } from "../src/utils/winston-logger";
import { LoggerToken } from "./globals";

export const loggerInitializationHook = (testFilename: string) => {
    Container.set(LoggerToken, new WinstonLogger(testFilename));
};
