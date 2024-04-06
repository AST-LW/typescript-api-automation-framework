import Container from "typedi";

import { UserClient } from "../../src/clients/user.client";
import { loggerInitializationHook } from "../../setup/hooks";
import { Actions } from "../../src/actions/action-lookup";
import { RequestDataGenerator } from "../../src/utils/request-data-generator";
import { SuccessfulUserCreationRequestModel, WithoutEmailRequestModel } from "../../src/models/request/user";

let userClient: UserClient;

beforeEach(() => {
    // Logger initialization
    loggerInitializationHook(expect.getState().currentTestName as string);

    //  Fetching the client objects
    userClient = Container.get(UserClient);
});

describe("User Suite", () => {
    it("@TEST_ID-1 - Create a new user successfully", async () => {
        const data = RequestDataGenerator.createUserPayload() as SuccessfulUserCreationRequestModel;

        const response = await Actions.user.successfulUserCreation(data);

        expect(response.statusCode).toBe(201);
        expect(response.data?.user_id).toBeTruthy();
        expect(response.data?.access_token).toBeTruthy();
    });

    it("@TEST_ID-2 - Unsuccessful creation of user, due to missing email field in the payload", async () => {
        const data = RequestDataGenerator.createUserPayload(["email"]) as WithoutEmailRequestModel; // Exclude email from the payload

        const response = await Actions.user.createUserWithoutEmail(data);

        expect(response.statusCode).toBe(400);
        expect(response.data?.error).toBe("Username, password, and email are required.");
    });

    it("@TEST_ID-3 - Unsuccessful creation of user, with no payload", async () => {
        const data: any = {};

        const response = await Actions.user.createUserWithoutEmail(data);

        expect(response.statusCode).toBe(400);
        expect(response.data?.error).toBe("Username, password, and email are required.");
    });

    it("@TEST_ID-3 - Successful user deletion", async () => {
        const response = await Actions.user.successfulUserDeletion();

        expect(response.statusCode).toBe(200);
        expect(response.data?.message).toBe("User deleted successfully");
    });
});
