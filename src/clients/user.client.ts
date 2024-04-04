import { Service } from "typedi";

import { Request, ResponseConfig } from "../utils/base.client";
import { CreateUserRequestModel } from "../models/request/user/create-user.request.model";
import { CreateUserResponseModel } from "../models/response/user/create-user.response.model";

@Service({ transient: true })
export class UserClient {
    async createUser(data: CreateUserRequestModel): Promise<ResponseConfig<CreateUserResponseModel>> {
        const response = await Request.builder<CreateUserRequestModel, CreateUserResponseModel>()
            .method("POST")
            .resourceEndpoint("todos/user/create")
            .payload(data)
            .send();

        return response;
    }
}
