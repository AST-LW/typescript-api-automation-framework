import { ShellScripts } from "./shell.js";
import path from "path";
import jsonPath from "jsonpath";

export class Resources {
    private static RESOURCE_DIR_PATH = path.join(process.cwd(), "resources");
    static readJSONTree(jsonContent, keyString) {
        return jsonPath.value(jsonContent, `$.${keyString}`);
    }

    static getResource(fileKey: string, key: string) {
        let resourceFiles = ShellScripts.getFilesRecursively(this.RESOURCE_DIR_PATH);
        const targetResourceFile = resourceFiles.find((resourceFile) => resourceFile.includes(fileKey));
        if (!targetResourceFile) {
            return "RESOURCE_FILE_DOES_NOT_EXIST";
        }
        const jsonResourceContents = ShellScripts.readFileWithBasedOnPattern(targetResourceFile, "json");
        const value = this.readJSONTree(jsonResourceContents, key);
        return value ? value : "KEY_NOT_IDENTIFIED";
    }
}
