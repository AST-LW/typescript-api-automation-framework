import { Service } from "typedi";

import { Request, ResponseConfig } from "../utils/base.client";

@Service({ transient: true })
export class TasksClient {
    async createTask<U, V>(data: U, accessToken: string): Promise<ResponseConfig<V>> {
        const response = await Request.builder<U, V>()
            .method("POST")
            .resourceEndpoint("todos/tasks/create")
            .headers({
                Authorization: `Bearer ${accessToken}`,
            })
            .payload(data)
            .send();

        return response;
    }

    async changeTaskStatus<U, V>(data: U, accessToken: string, taskID: string): Promise<ResponseConfig<V>> {
        const response = await Request.builder<U, V>()
            .method("PATCH")
            .resourceEndpoint(`todos/tasks/status/${taskID}`)
            .headers({
                Authorization: `Bearer ${accessToken}`,
            })
            .payload(data)
            .send();

        return response;
    }

    async getTodos<U, V>(accessToken: string): Promise<ResponseConfig<V>> {
        const response = await Request.builder<U, V>()
            .method("GET")
            .resourceEndpoint(`todos/tasks/read`)
            .headers({
                Authorization: `Bearer ${accessToken}`,
            })
            .send();

        return response;
    }
}
