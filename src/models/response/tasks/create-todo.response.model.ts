export interface CreateTodoResponseModel {
    todo_id: string;
    title: string;
    description: string;
    status: "not_started" | "in_progress" | "completed";
    created_at: string;
    user_id: string;
}
