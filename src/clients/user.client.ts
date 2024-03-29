import { RegisterRequestModel } from "../models/request/register.request.model";
import { RegisterResponseModel } from "../models/response/register.response.model";
import { Request, ResponseConfig } from "../utils/base.client";

export class UserClient {
    static async registerUser(data: RegisterRequestModel): Promise<ResponseConfig<RegisterResponseModel>> {
        const response = await Request.builder<RegisterRequestModel, RegisterResponseModel>()
            .method("POST")
            .resourceEndpoint("/api/register")
            .payload(data)
            .send();

        return response;
    }
}
