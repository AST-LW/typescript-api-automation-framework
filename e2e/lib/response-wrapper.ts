export interface ResponseWrapper<T> {
    statusCode: number;
    body?: T;
    error?: string;
}
