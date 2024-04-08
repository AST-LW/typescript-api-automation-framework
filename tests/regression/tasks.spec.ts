import Container from "typedi";

import { addLogsToAllure, loggerInitializationHook } from "../../setup/within-hooks";
import { Actions } from "../../src/actions/action-lookup";
import { RequestDataGenerator } from "../../src/utils/request-data-generator";
import { SuccessfulTaskCreationRequestModel } from "../../src/models/request/tasks/create-task.request.model";
import { TasksClient } from "../../src/clients/tasks.client";

let taskClient: TasksClient;

beforeEach(() => {
    // Logger initialization
    loggerInitializationHook(expect.getState().currentTestName as string);

    //  Fetching the client objects
    taskClient = Container.get(TasksClient);
});

afterEach(() => {
    addLogsToAllure(expect.getState().currentTestName as string);
});

describe("Tasks Suite", () => {
    it("@TEST_ID-1 - Create a task successfully", async () => {
        const data = RequestDataGenerator.createTaskPayload() as SuccessfulTaskCreationRequestModel;

        const response = await Actions.tasks.successfulTaskCreation(data);

        // Test will fail here as the creation status code is going to be 201 but returned 200
        expect(response.statusCode).toBe(201);
        expect(response.data?.title).toBe(data.title);
        expect(response.data?.description).toBe(data.description);
        expect(response.data?.user_id).toBeTruthy();
    });
});
