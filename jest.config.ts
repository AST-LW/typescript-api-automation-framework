import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: ".",
    testEnvironment: "node",
    testMatch: ["<rootDir>/tests/**/*.spec.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
