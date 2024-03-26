import fetch from "node-fetch";
import { UserClient } from "../clients/user.client";

describe("User end-point tests", () => {
    test("Successful creation of user account", async () => {
        const data = {
            name: "morpheus",
            job: "leader",
        };
        const response = await UserClient().createUser(data);

        expect(response.statusCode).toBe(201);
        expect(response.body?.name).toBeTruthy();
    });
});
