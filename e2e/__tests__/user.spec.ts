import { UserClient } from "../clients/user.client";
import data from "../respository/user/create-user.reposiotry.json";

describe("User end-point tests", () => {
    test("Successful creation of user account", async () => {
        const response = await UserClient().createUser(data);

        expect(response.statusCode).toBe(201);
        expect(response.body?.name).toBeTruthy();
    });
});
