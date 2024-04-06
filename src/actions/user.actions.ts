import Container, { Service } from "typedi";
import { UserClient } from "../clients/user.client";
import {
    SuccessfulUserCreationResponseModel,
    EmptyPayload as EmptyPayloadResponseModel,
    WithoutEmailResponseModel,
} from "../models/response/user/create-user.response.model";
import { ResponseConfig } from "../utils/base.client";
import { SuccessfulUserCreationRequestModel, WithoutEmailRequestModel } from "../models/request/user";
import { SuccessfulUserDeletionResponseModel } from "../models/response/user/delete-user.response.model";
import { RequestDataGenerator } from "../utils/request-data-generator";

@Service({ transient: true })
export class UserActions {
    private readonly userClient: UserClient;

    constructor() {
        this.userClient = Container.get(UserClient);
    }

    async successfulUserCreation(
        data: SuccessfulUserCreationRequestModel
    ): Promise<ResponseConfig<SuccessfulUserCreationResponseModel>> {
        const response = await this.userClient.createUser<
            SuccessfulUserCreationRequestModel,
            SuccessfulUserCreationResponseModel
        >(data);
        return response;
    }

    async createUserWithoutEmail(data: WithoutEmailRequestModel) {
        const response = await this.userClient.createUser<WithoutEmailRequestModel, WithoutEmailResponseModel>(data);
        return response;
    }

    async createUserWithNoPayload(data: {}) {
        const response = await this.userClient.createUser<{}, EmptyPayloadResponseModel>(data);
        return response;
    }

    async successfulUserDeletion() {
        // Create a new user and capture the user ID
        const data = RequestDataGenerator.createUserPayload() as SuccessfulUserCreationRequestModel;
        const createdUserResponse = await this.userClient.createUser<
            SuccessfulUserCreationRequestModel,
            SuccessfulUserCreationResponseModel
        >(data);
        const userID = createdUserResponse.data?.user_id as string;

        const response = await this.userClient.deleteUser<SuccessfulUserDeletionResponseModel>(userID);
        return response;
    }
}
