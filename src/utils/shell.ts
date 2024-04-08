import shell from "shelljs";
import { glob } from "glob";

export class ShellScripts {
    static createDIR(destinationPath: string) {
        return shell.mkdir("-p", destinationPath).code === 0 ? true : false;
    }
    static deleteDIR(dirPath: string) {
        return shell.rm("-rf", dirPath).code === 0 ? true : false;
    }

    static createFile(filePath: string) {
        return shell.touch(filePath).code === 0 ? true : false;
    }

    static deleteFile(filePath: string, multiple = false) {
        return multiple === false
            ? shell.rm(filePath).code === 0
                ? true
                : false
            : shell.rm(...filePath).code === 0
            ? true
            : false;
    }

    static check({ dirPath, filePath }: any, toCheck = "file") {
        // Silent the standard errors
        shell.config.silent = true;
        switch (toCheck) {
            case "file":
                return shell.test("-f", filePath);
            case "dir":
                return shell.test("-d", dirPath);
        }
    }

    static __cat({ filePath, type }) {
        switch (type) {
            case "txt":
                return shell.cat(filePath).toString();
            case "json":
                return JSON.parse(shell.cat(filePath));
            case "log":
                return shell.cat(filePath).toString();
            default:
                throw new Error(`Unsupported file type: ${type}`);
        }
    }

    static readFileContents(filePath, type = "txt") {
        return ShellScripts.__cat({ filePath, type });
    }

    static readFileWithBasedOnPattern(filePattern: string, type = "txt") {
        const matchedFile = glob.sync(filePattern);
        if (matchedFile.length === 0) {
            return null;
        }
        return ShellScripts.__cat({ filePath: matchedFile, type });
    }

    static writeToFile(filePath: string, contents) {
        shell.ShellString(contents).to(filePath);
    }

    static clearFile(filePath) {
        shell.ShellString("").to(filePath);
    }

    static executeTerminalCMDs(command: string) {
        const commandResult = shell.exec(command, { silent: false });
        return {
            executed: commandResult.code,
            output: commandResult.stdout,
        };
    }

    static getFilesRecursively(dirPath) {
        return shell.find(dirPath).filter((file) => ShellScripts.check({ filePath: file }, "file"));
    }
}
