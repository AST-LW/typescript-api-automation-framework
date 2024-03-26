export interface RequestWrapper<T> {
    endPoint?: string;
    method?: HTTP_METHOD;
    body?: T;
    headers?: { [key: string]: any };
    queryParams?: { [key: string]: string };
}

export type HTTP_METHOD = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
