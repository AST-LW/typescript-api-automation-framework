import { Inject, Service } from "typedi";
import { RegisterRequestModel } from "../models/request/register.request.model";
import { RegisterResponseModel } from "../models/response/register.response.model";
import { Request, ResponseConfig } from "../utils/base.client";
import { Logger } from "../utils/winston-logger";
import { LoggerMethods } from "../interfaces/utils/logger-methods.interface";

@Service({ transient: true })
export class UserClient {
    private logger: LoggerMethods;
    constructor(@Inject() private loggerInstance: Logger) {
        this.logger = loggerInstance.getLoggerInstance();
    }

    async registerUser(data: RegisterRequestModel): Promise<ResponseConfig<RegisterResponseModel>> {
        this.logger.info("This is user client");
        const response = await Request.builder<RegisterRequestModel, RegisterResponseModel>()
            .method("POST")
            .resourceEndpoint("/api/register")
            .payload(data)
            .send();

        return response;
    }
}
