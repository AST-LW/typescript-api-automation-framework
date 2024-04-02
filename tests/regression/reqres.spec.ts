import Container from "typedi";

import { UserClient } from "../../src/clients/user.client";
import { loggerInitializationHook } from "../../setup/hooks";

let userClient: UserClient;

beforeEach(() => {
    // Logger initialization
    loggerInitializationHook(expect.getState().currentTestName as string);

    //  Fetching the client objects
    userClient = Container.get(UserClient);
});

describe("User CRUD Suite", () => {
    it("@TEST_ID-1 Register user successfully", async () => {
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
