import Container, { Service } from "typedi";
import { TasksClient } from "../clients/tasks.client";
import {
    SuccessfulTaskCreationRequestModel,
    WithoutTaskTitleRequestModel,
} from "../models/request/todos/create-todos.request.model";
import { RequestDataGenerator } from "../utils/request-data-generator";
import {
    SuccessfulTaskCreationResponseModel,
    WithoutTitleResponseModel,
} from "../models/response/todos/create-todos.response.model";
import {
    GetTodosForExistingUserResponseModel,
    GetTodosForNewUserResponseModel,
} from "../models/response/todos/read-todos.response.model";
import { ResponseConfig } from "../utils/base.client";

@Service({ transient: true })
export class TasksActions {
    private readonly tasksClient: TasksClient;

    constructor() {
        this.tasksClient = Container.get(TasksClient);
    }

    async successfulTaskCreation(data: SuccessfulTaskCreationRequestModel) {
        const accessToken = await RequestDataGenerator.fetchAccessToken();

        const response = await this.tasksClient.createTask<
            SuccessfulTaskCreationRequestModel,
            SuccessfulTaskCreationResponseModel
        >(data, accessToken);

        return response;
    }

    async createTaskWithoutTitle(data: WithoutTaskTitleRequestModel) {
        const accessToken = await RequestDataGenerator.fetchAccessToken();

        const response = await this.tasksClient.createTask<WithoutTaskTitleRequestModel, WithoutTitleResponseModel>(
            data,
            accessToken
        );

        return response;
    }

    async getTodos(
        status: "new" | "existing",
        userID?: string
    ): Promise<ResponseConfig<GetTodosForNewUserResponseModel> | ResponseConfig<GetTodosForExistingUserResponseModel>> {
        let accessToken: string;
        let response:
            | ResponseConfig<GetTodosForNewUserResponseModel>
            | ResponseConfig<GetTodosForExistingUserResponseModel> = {};

        if (status === "new") {
            accessToken = await RequestDataGenerator.fetchAccessToken();
            response = await this.tasksClient.getTodos<any, GetTodosForNewUserResponseModel>(accessToken);
        } else if (status === "existing") {
            const newAccessToken = await RequestDataGenerator.fetchNewAccessToken(userID as string);
            response = await this.tasksClient.getTodos<any, GetTodosForExistingUserResponseModel>(newAccessToken);
        }

        return response;
    }
}
