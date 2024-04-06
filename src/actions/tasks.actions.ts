import Container, { Service } from "typedi";
import { TasksClient } from "../clients/tasks.client";
import { SuccessfulTaskCreationRequestModel } from "../models/request/tasks/create-task.request.model";
import { RequestDataGenerator } from "../utils/request-data-generator";
import { SuccessfulTaskCreationResponseModel } from "../models/response/tasks/create-todo.response.model";

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
}
