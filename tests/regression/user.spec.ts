import Container from "typedi";

import { UserClient } from "../../src/clients/user.client";
import { loggerInitializationHook } from "../../setup/hooks";
import { DataGenerator } from "../../src/utils/data-generator";
import userStaticData from "../data/user.json";
import { Actions } from "../../src/actions/action-lookup";

let userClient: UserClient;

beforeEach(() => {
    // Logger initialization
    loggerInitializationHook(expect.getState().currentTestName as string);

    //  Fetching the client objects
    userClient = Container.get(UserClient);
});

describe("User CRUD Suite", () => {
    it("@TEST_ID-1 - create a new user successfully", async () => {
        const username = DataGenerator.generateUsername();
        const email = DataGenerator.generateEmail(username);
        const password = userStaticData.create_new_user_password;

        const data = {
            username,
            password,
            email,
        };

        const response = await Actions.user.createUser(data);

        expect(response.statusCode).toBe(201);
        expect(response.data?.user_id).toBeTruthy();
        expect(response.data?.access_token).toBeTruthy();
    });
});
