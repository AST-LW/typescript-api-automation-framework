import { Service } from "typedi";

import { Request, ResponseConfig } from "../utils/base.client";
import { CONFIG } from "../../config";

@Service({ transient: true })
export class UserClient {
    async createUser<U, V>(data: U): Promise<ResponseConfig<V>> {
        const response = await Request.builder<U, V>()
            .method("POST")
            .resourceEndpoint("todos/user/create")
            .payload(data)
            .send();

        return response;
    }

    async deleteUser<U>(userID: string): Promise<ResponseConfig<U>> {
        const response = await Request.builder<any, U>() // In this end-point we are not going to have the request payload, so assigning it to "any" type
            .method("DELETE")
            .resourceEndpoint(`todos/user/delete/${userID}`)
            .send();

        return response;
    }

    async fetchNewAccessToken<U>(userID: string): Promise<ResponseConfig<U>> {
        const response = await Request.builder<any, U>()
            .method("GET")
            .resourceEndpoint(`todos/user/token/${userID}`)
            .headers({
                "x-api-key": (CONFIG as any).X_API_KEY as string,
            })
            .send();

        return response;
    }
}
