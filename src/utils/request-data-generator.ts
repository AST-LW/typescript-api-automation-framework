import { DataGenerator } from "./random-data-generator";
import userStaticData from "../data/user.json";
import Container from "typedi";
import { UserClient } from "../clients/user.client";
import { SuccessfulUserCreationResponseModel } from "../models/response/user/create-user.response.model";
import { SuccessfulUserCreationRequestModel } from "../models/request/user";

export class RequestDataGenerator {
    static createUserPayload(exclude: string[] = []): {
        username?: string;
        email?: string;
        password?: string;
    } {
        const username = DataGenerator.generateUsername();
        const email = DataGenerator.generateEmail(username);
        const password = userStaticData.create_new_user_password;

        const payload: {
            username?: string;
            email?: string;
            password?: string;
        } = {
            username,
            email,
            password,
        };

        // Iterate over properties and delete those specified in 'exclude'
        for (const prop of exclude) {
            if (payload.hasOwnProperty(prop)) {
                delete payload[prop];
            }
        }

        return payload;
    }

    static createTaskPayload(): { title?: string; description?: string } {
        const title = "This is the title of the task";
        const description = "This is the description of the task";

        return {
            title,
            description,
        };
    }

    static async fetchAccessToken(): Promise<string> {
        const userClient = Container.get(UserClient);
        const accessToken = (
            await userClient.createUser<SuccessfulUserCreationRequestModel, SuccessfulUserCreationResponseModel>(
                this.createUserPayload() as SuccessfulUserCreationRequestModel
            )
        ).data?.access_token as string;

        return accessToken;
    }
}
