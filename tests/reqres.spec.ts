import { UserClient } from "../src/clients/user.client";

describe("User CRUD Suite", () => {
    it("Register user successfully", async () => {
        const data = {
            email: "eve.holt@reqres.in",
            password: "pistol",
        };

        const response = await UserClient.registerUser(data);

        expect(response.statusCode).toBe(200);
        expect(response.data?.id).toBeTruthy();
    });
});
