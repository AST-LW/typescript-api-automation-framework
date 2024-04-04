import Container, { Service } from "typedi";
import { UserClient } from "../clients/user.client";
import { CreateUserResponseModel } from "../models/response/user/create-user.response.model";
import { ResponseConfig } from "../utils/base.client";
import { CreateUserRequestModel } from "../models/request/user";

@Service({ transient: true })
export class UserActions {
    private readonly userClient: UserClient;

    constructor() {
        this.userClient = Container.get(UserClient);
    }

    async createUser(data: CreateUserRequestModel): Promise<ResponseConfig<CreateUserResponseModel>> {
        const response = await this.userClient.createUser(data);
        return response;
    }
}
