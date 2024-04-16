# typescript-api-automation-framework

The following is the e2e test framework with the following folder structure:

```
e2e/
├── __tests__/              # This directory holds all the test specifications.
│   └── <test-file-name>.spec.ts
│       ├── Use Clients
│       ├── Make API Calls
│       ├── Assert Responses
│       └── Utilize Data from Repositories
|
├── clients/                # Client files for API interaction.
│   ├── <group-name>/       # Grouping clients by functionality or domain.
│   │   └── <client-file-name>.client.ts
│   │       ├── Import Request Models
│   │       ├── Import Response Models
│   │       └── Execute API Requests
│   └── <another-group-name>/
|
├── interfaces/             # Model definitions for requests and responses.
│   ├── <group-name>/       # Grouping interfaces by functionality or domain.
│   │   ├── request/
│   │   │   └── <request-model-name>.request.ts
│   │   └── response/
│   │       └── <response-model-name>.response.ts
│   └── <another-group-name>/
|
├── repositories/           # JSON data models or fixtures for tests.
│   ├── <group-name>/       # Grouping data models/fixtures by functionality or domain.
│   │   └── <data-model-name>.json
│   │       └── Export Data Models/Fixtures
│   └── <another-group-name>/
|
└── lib/                    # Additional library functions that might be used across tests.
    └── <some library functions>
```

### Detailed Flow of Writing a Test Case:

1. **Define Request/Response Models in `interfaces/`:**
   - **Purpose:** Establish the structure of data for API requests and responses.
   - **Steps:**
     1. Define request models in `interfaces/request/`.
     2. Define response models in `interfaces/response/`.

2. **Create Clients in `clients/`:**
   - **Purpose:** Implement the logic to interact with the API using the models.
   - **Steps:**
     1. Import the necessary request and response models from `interfaces/`.
     2. Code the functions to execute API requests, utilizing imported models.

3. **Utilize Data from `repositories/`:**
   - **Purpose:** Manage and export data models or fixtures necessary for making requests or setting up test environments.
   - **Steps:**
     1. Create or import data models/fixtures in `repositories/`.
     2. Export these models/fixtures to be used in clients or directly in tests for setup/teardown or mock data.

4. **Write Test Specs in `__tests__/`:**
   - **Purpose:** Utilize clients to make API calls, assert the responses based on expected outcomes, and incorporate data from `repositories/`.
   - **Steps:**
     1. Import clients and data models/fixtures from `repositories/`.
     2. Use clients to make API calls in tests.
     3. Utilize data models/fixtures for test setup/teardown or as mock data.
     4. Assert the API responses against the expected models and behaviors.


### Workflow Illustration:

```
Define Request/Response Models
             |
             | (Use models)
             V
       Create Clients
             |
             | (Utilize clients to make API calls)
             |-----------------------------|
             |                             |
             V                             V
      Write Test Specs          Utilize Data from Repositories
             |                             |
             | (Run tests & validate)      |
             |-----------------------------|
                                     |
                               Tests Execution & Validation
```

Illustrative example:

### Step 1: Define Request/Response Models

**Path: `e2e/interfaces/request/user.request.ts`**
```typescript
export interface CreateUserRequest {
    name: string;
    job: string;
}
```

**Path: `e2e/interfaces/response/user.response.ts`**
```typescript
export interface CreateUserResponse {
    name: string;
    job: string;
    id: string;
    createdAt: string;
}
```

### Step 2: Create the User Client

**Path: `e2e/clients/user/user.client.ts`**
```typescript
import { createClient } from "../../lib/create-client";
import { CreateUserRequest } from "../../interfaces/request/user.request";
import { CreateUserResponse } from "../../interfaces/response/user.response";
import { ResponseWrapper } from "../../lib/response-wrapper";
import { RequestWrapper } from "../../lib/request-wrapper";
import { getResponse } from "../../lib/node-fetch-wrapper";

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
```

### Step 3: Prepare Test Data in Repository

**Path: `e2e/repositories/user/create-user.repository.json`**
```json
{
    "name": "morpheus",
    "job": "leader"
}
```

### Step 4: Write the Test Specification

**Path: `e2e/__tests__/user.spec.ts`**
```typescript
import { UserClient } from "../clients/user/user.client";
import data from "../repositories/user/create-user.repository.json";

describe("User end-point tests", () => {
    test("Successful creation of user account", async () => {
        const response = await UserClient().createUser(data);

        expect(response.statusCode).toBe(201);
        expect(response.body?.name).toBeTruthy();
    });
});
```

Our complete code must be generated based on the following information given at hand:

- CURL command
- Response schema

{
    curl_command: string,
    response_schema: json_object
}

### Mandatory Rules for Code Generation

1. **Imports and Exports:** Ensure all imports and exports are correctly handled for each file to maintain modularity and facilitate easy integration and testing.
2. **Component Separation:** Based on the CURL command and response schema, intelligently segregate the information into distinct components: `__tests__`, `clients`, `interfaces` (request & response), and `repositories`.
3. **Meaningful Naming:** Analyze the endpoint from the CURL command to generate meaningful file and variable names that are consistently used across all components, enhancing readability and maintainability.
4. **Accurate Folder Structure:** Adhere to the specified folder structure, placing generated code in the correct directories.

### Process Flow Diagram with further explanation:

```
CURL Command + Response Schema
        |
        |---[Analyze]--->
        |
      Components
        |                   (interfaces, repositories, clients
        |---[Generate]--->   , __tests__)
        |
    Folder Structure
        |
        |---[Place]--->
        |
     Code Files (with
   meaningful names and
     proper imports)
```

### Detailed Steps:

1. **Analyze CURL Command and Response Schema:** 
   - Extract the HTTP method, endpoint, request body, and headers from the CURL command.
   - Parse the response schema to understand the data structure returned by the API.

2. **Generate Code for Components:**
   - **Interfaces:** Create request and response interfaces based on the request body and the response schema.
   - **Clients:** Develop a client file that imports request and response interfaces, constructing functions to make API calls.
   - **Repositories:** Prepare JSON files in repositories with given data in the curl command.
   - **Tests:** Write test specifications in `__tests__` that use the client to make API calls and assert the response.

3. **Place Generated Code in Correct Folder Structure:** Ensure each piece of code is saved to its respective directory, adhering to the predefined framework structure.

4. **Use Meaningful Names:** Base file names and variables on the API endpoint, ensuring consistency and clarity across the framework.

Tech stack used: Typescript & Jest
