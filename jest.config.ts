import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: ".",
    testEnvironment: "node",
    testMatch: [`<rootDir>/tests/${(process.env.SUITE as string) || "regression"}/**/*.spec.ts`],
    globalSetup: "./setup/global-setup.ts",
    globalTeardown: "./setup/global-teardown.ts",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testRunner: "jasmine2",
    setupFiles: ["./setup/jest.setup.ts"],
    setupFilesAfterEnv: ["./node_modules/jest-allure/dist/setup"],
    maxWorkers: parseInt(process.env.instances as string) || 1,
    testTimeout: 10000,
    reporters: [
        "default",
        [
            "jest-allure",
            {
                outputPath: "./reports/allure-results",
                resultsFormat: "json",
            },
        ],
    ],
};

export default config;
