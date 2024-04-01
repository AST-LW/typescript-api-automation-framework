import Container from "typedi";

import { UserClient } from "../src/clients/user.client";
import { Logger, WinstonLogger } from "../src/utils/winston-logger";

let userClient: UserClient;

beforeEach(() => {
    const testName = expect.getState().currentTestName;
    const loggerFilePath = process.cwd() + "/logs/" + testName + ".log";
    Container.set(Logger, new WinstonLogger(loggerFilePath) as Logger);

    userClient = Container.get(UserClient);
});

describe("User CRUD Suite", () => {
    it("Register user successfully", async () => {
        const data = {
            email: "eve.holt@reqres.in",
            password: "pistol",
        };

        const response = await userClient.registerUser(data);

        expect(response.statusCode).toBe(200);
        expect(response.data?.id).toBeTruthy();
    });

    it("Login user successfully", async () => {
        const data = {
            email: "eve.holt@reqres.in",
            password: "pistol",
        };

        const response = await userClient.registerUser(data);

        expect(response.statusCode).toBe(200);
        expect(response.data?.id).toBeTruthy();
    });
});
