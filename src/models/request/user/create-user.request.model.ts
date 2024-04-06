export interface SuccessfulUserCreationRequestModel {
    username: string;
    email: string;
    password: string;
}

export interface WithoutEmailRequestModel {
    username: string;
    password: string;
}
