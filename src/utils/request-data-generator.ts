import Container from "typedi";

import { DataGenerator } from "./random-data-generator";
import userStaticData from "../data/user.json";
import { UserClient } from "../clients/user.client";
import { SuccessfulUserCreationResponseModel } from "../models/response/user/create-user.response.model";
import { SuccessfulUserCreationRequestModel } from "../models/request/user";
import { SuccessfulFetchOfNewAccessTokenResponseModel } from "../models/response/todos/create-todos.response.model";

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

    static createTaskPayload(exclude: string[] = []): { title?: string; description?: string } {
        const title = DataGenerator.generateTaskTitle();
        const description = DataGenerator.generateTaskDescription();

        const payload = {
            title,
            description,
        };

        for (let prop of exclude) {
            if (payload.hasOwnProperty(prop)) {
                delete payload[prop];
            }
        }

        return payload;
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

    static async fetchNewAccessToken(userID: string): Promise<string> {
        const userClient = Container.get(UserClient);
        const accessToken = (await userClient.fetchNewAccessToken<SuccessfulFetchOfNewAccessTokenResponseModel>(userID))
            .data?.access_token as string;

        return accessToken;
    }
}
