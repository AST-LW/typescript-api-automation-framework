import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: ".",
    testEnvironment: "node",
    testMatch: ["<rootDir>/tests/**/*.spec.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testRunner: "jasmine2",
    setupFilesAfterEnv: ["./node_modules/jest-allure/dist/setup"],
    reporters: [
        "default",
        [
            "jest-allure",
            {
                outputPath: "./reports/allure-results",
            },
        ],
    ],
};

export default config;
