interface ErrorResponseModel {
    error: string;
}

export interface SuccessfulUserCreationResponseModel {
    user_id: string;
    access_token: string;
}

export interface WithoutEmailResponseModel extends ErrorResponseModel {}

export interface EmptyPayload extends ErrorResponseModel {}
