import Container from "typedi";

import { addLogsToAllure, loggerInitializationHook } from "../../../setup/within-hooks";
import { Actions } from "../../../src/actions/action-lookup";

import { TasksClient } from "../../../src/clients/tasks.client";
import { ResponseConfig } from "../../../src/utils/base.client";
import {
    GetTodoWithoutAccessTokenResponseModel,
    GetTodosForExistingUserResponseModel,
    GetTodosForNewUserResponseModel,
} from "../../../src/models/response/todos/read-todos.response.model";

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

describe("Read Todos Suite", () => {
    it("@TEST_ID-2113 - Todos must be empty for a newly created user", async () => {
        const response = (await Actions.tasks.getTodos("new", {})) as ResponseConfig<GetTodosForNewUserResponseModel>;

        expect(response.statusCode).toBe(200);
        expect(response.data?.todos).toStrictEqual([]);
    });

    it("@TEST_ID-1024 - Todos must be empty for a newly created user", async () => {
        const userID = "6dd2e64d-fba5-4dae-b338-be80e32cbc6a";

        const response = (await Actions.tasks.getTodos("existing", {
            userID,
        })) as ResponseConfig<GetTodosForExistingUserResponseModel>;

        expect(response.statusCode).toBe(200);
        expect(response.data?.todos).toHaveLength(1);
    });

    it("@TEST_ID-1425 - Fetching todos failed due to incorrect access token", async () => {
        const response = (await Actions.tasks.getTodos("new", {
            accessToken: "",
        })) as ResponseConfig<GetTodoWithoutAccessTokenResponseModel>;

        expect(response.statusCode).toBe(401);
        expect(response.data?.message).toBe("Failed to authenticate token");
    });
});
