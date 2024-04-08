import Container from "typedi";
import { WinstonLogger } from "../src/utils/winston-logger";
import { LoggerToken } from "./globals";
import { Reporter } from "jest-allure/dist/Reporter";
import { ShellScripts } from "../src/utils/shell";
import { GeneralOperations } from "../src/utils/general-operations";

declare const reporter: Reporter;

export const loggerInitializationHook = (testFilename: string) => {
    const testnameAsUuid = GeneralOperations.generateTestNameAsUUID(testFilename);
    Container.set(LoggerToken, new WinstonLogger(testnameAsUuid));
};

export const addLogsToAllure = (testFilename: string) => {
    const testnameAsUuid = GeneralOperations.generateTestNameAsUUID(testFilename);
    reporter.addAttachment(
        testFilename.split("@")[1],
        ShellScripts.readFileContents(process.cwd() + "/logs" + "/" + testnameAsUuid + ".log", "log"),
        "text/plain"
    );
};
