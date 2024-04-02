import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: ".",
    testEnvironment: "node",
    testMatch: [`<rootDir>/tests/${(process.env.SUITE as string) || "sanity"}/**/*.spec.ts`],
    globalSetup: "./setup/global-setup.ts",
    globalTeardown: "./setup/global-teardown.ts",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testRunner: "jasmine2",
    setupFiles: ["./setup/jest.setup.ts"],
    setupFilesAfterEnv: ["./node_modules/jest-allure/dist/setup"],
    maxWorkers: 5,
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
