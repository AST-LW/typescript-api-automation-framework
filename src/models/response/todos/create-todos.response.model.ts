interface ErrorResponseModel {
    error: string;
}

export interface SuccessfulTaskCreationResponseModel {
    todo_id: string;
    title: string;
    description: string;
    status: "not_started" | "in_progress" | "completed";
    created_at: string;
    user_id: string;
}

export interface WithoutTitleResponseModel extends ErrorResponseModel {}

export interface SuccessfulFetchOfNewAccessTokenResponseModel {
    access_token: string;
    expires_in: string;
}
