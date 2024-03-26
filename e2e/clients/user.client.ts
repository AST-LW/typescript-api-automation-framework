import { createClient } from "../lib/create-client";
import { CreateUserRequest } from "../interfaces/request/user.request";
import { CreateUserResponse } from "../interfaces/response/user.response";
import { ResponseWrapper } from "../lib/response-wrapper";
import { RequestWrapper } from "../lib/request-wrapper";
import { getResponse } from "../lib/node-fetch-wrapper";

export const UserClient = () =>
    createClient({
        actions: (headers) => ({
            createUser(data: CreateUserRequest): Promise<ResponseWrapper<CreateUserResponse>> {
                const request: RequestWrapper<CreateUserRequest> = {
                    endPoint: "api/users",
                    headers: headers,
                    body: data,
                    method: "POST",
                };

                return getResponse(request);
            },
        }),
    });
