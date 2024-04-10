import Container from "typedi";

import { UserClient } from "../../../src/clients/user.client";
import { addLogsToAllure, loggerInitializationHook } from "../../../setup/within-hooks";
import { Actions } from "../../../src/actions/action-lookup";

let userClient: UserClient;

beforeEach(() => {
    // Logger initialization
    loggerInitializationHook(expect.getState().currentTestName as string);

    //  Fetching the client objects
    userClient = Container.get(UserClient);
});

afterEach(() => {
    addLogsToAllure(expect.getState().currentTestName as string);
});

describe("User Suite", () => {
    it("@TEST_ID-5 - Successful user deletion", async () => {
        const response = await Actions.user.successfulUserDeletion();

        expect(response.statusCode).toBe(200);
        expect(response.data?.message).toBe("User deleted successfully");
    });
});
