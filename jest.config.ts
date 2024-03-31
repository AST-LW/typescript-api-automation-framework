import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: ".",
    testEnvironment: "node",
    testMatch: ["<rootDir>/tests/**/*.spec.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    reporters: [
        [
            "jest-html-reporter",
            {
                outputPath: "./reports/test-report.html",
                pageTitle: "E2E Test Suite",
                includeFailureMsg: true,
            },
        ],
    ],
};

export default config;
