import path from "path";
import { ShellScripts } from "./shell";

export class ENV {
    private static API_CONFIG_FILE_PATH = path.join(process.cwd(), "api.config.json");

    static getConfigEnv(key: string, override: boolean = true) {
        const envContents = ShellScripts.readFileWithBasedOnPattern(this.API_CONFIG_FILE_PATH, "json");
        if (process.env[key] && override) {
            return process.env[key];
        } else if (envContents[key]) {
            return envContents[key];
        }
    }
}
