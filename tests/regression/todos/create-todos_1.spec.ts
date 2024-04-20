import Container from "typedi";

import { addLogsToAllure, loggerInitializationHook } from "../../../setup/within-hooks";
import { Actions } from "../../../src/actions/action-lookup";
import { RequestDataGenerator } from "../../../src/utils/request-data-generator";
import {
    SuccessfulTaskCreationRequestModel,
    WithoutTaskTitleRequestModel,
} from "../../../src/models/request/todos/create-todos.request.model";
import { TasksClient } from "../../../src/clients/tasks.client";

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

describe("Create Todos Suite", () => {
    it("@TEST_ID-1222 - Create a task successfully", async () => {
        const data = RequestDataGenerator.createTaskPayload() as SuccessfulTaskCreationRequestModel;

        const response = await Actions.tasks.successfulTaskCreation(data);

        // Test will fail here as the creation status code is going to be 201 but returned 200
        expect(response.statusCode).toBe(201);
        expect(response.data?.title).toBe(data.title);
        expect(response.data?.description).toBe(data.description);
        expect(response.data?.user_id).toBeTruthy();
    });

    const taskCreationIncompletePayload = [
        { missingField: "title", testID: "@TEST_ID-1223" },
        { missingField: "description", testID: "@TEST_ID-1224" },
    ];

    taskCreationIncompletePayload.forEach(({ missingField, testID }) => {
        it(`${testID} - Unsuccessful creation of task due to missing ${missingField}`, async () => {
            // Adjust the payload based on the missing field
            const data =
                missingField === "title"
                    ? (RequestDataGenerator.createTaskPayload(["title"]) as WithoutTaskTitleRequestModel)
                    : (RequestDataGenerator.createTaskPayload(["description"]) as WithoutTaskTitleRequestModel);

            const response = await Actions.tasks.createTaskWithoutTitle(data);

            expect(response.statusCode).toBe(400);
            expect(response.data?.error).toBe("Title and description are required.");
        });
    });
});
