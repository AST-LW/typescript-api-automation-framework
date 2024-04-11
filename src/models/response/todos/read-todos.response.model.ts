interface Todo {
    todo_id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    user_id: string;
}

export interface GetTodosForNewUserResponseModel {
    todos: any[];
}

export interface GetTodosForExistingUserResponseModel {
    todos: Todo[];
}

export interface GetTodoWithoutAccessTokenResponseModel {
    message: string;
}
