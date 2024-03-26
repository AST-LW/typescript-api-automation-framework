import fetch from "node-fetch";
import { RequestWrapper } from "./request-wrapper";
import { ResponseWrapper } from "./response-wrapper";

export const getResponse = async <T, U>(request: RequestWrapper<T>): Promise<ResponseWrapper<U>> => {
    let host = "";
    switch (process.env.ENVIRONMENT?.toLowerCase()) {
        default:
            host = "https://reqres.in/";
            break;
    }

    const url = new URL(`${host}${request.endPoint}`);

    if (request.queryParams && Object.keys(request.queryParams).length > 0) {
        url.search = new URLSearchParams(request.queryParams).toString();
    }

    const response = await fetch(url.toString(), {
        method: request.method,
        body: JSON.stringify(request.body),
        headers: request.headers,
    });

    return {
        statusCode: response.status,
        body: (await response.json()) as U,
        error: response.statusText,
    };
};
