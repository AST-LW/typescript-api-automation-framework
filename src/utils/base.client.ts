import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ENV } from "./env-loader";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface RequestConfig<T> {
    method?: any;
    url?: any;
    params?: { [key: string]: string };
    data?: T;
    headers?: { [key: string]: string };
}

export interface ResponseConfig<U> {
    statusCode?: number;
    data?: U;
    headers?: { [key: string]: string };
}

export class Request<T, U> {
    private readonly baseUrl: string;
    private readonly client: AxiosInstance;
    private config: RequestConfig<T>;

    constructor() {
        this.baseUrl = ENV.getConfigEnv("BASE_URL");
        this.client = axios.create({
            baseURL: this.baseUrl,
        });

        this.client.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return error.response;
            }
        );

        this.config = {};
    }

    method(method: HttpMethod) {
        this.config.method = method;
        return this;
    }

    resourceEndpoint(resourceEndpoint: string) {
        this.config.url = resourceEndpoint;
        return this;
    }

    headers(headers: { [key: string]: string }) {
        this.config.headers = this.config.headers || {}; // Initialize this.config.headers if it's not already defined

        this.config.headers["Content-Type"] = "application/json";
        this.config.headers = {
            ...headers,
        };
        return this;
    }

    params(params: { [key: string]: string }) {
        this.config.params = {
            ...params,
        };
        return this;
    }

    payload(payload: T) {
        this.config.data = {
            ...payload,
        };
        return this;
    }

    async send(): Promise<ResponseConfig<U>> {
        try {
            const response: AxiosResponse = await this.client.request(this.config);
            return {
                statusCode: response.status,
                data: response.data as U,
                headers: response.headers as { [key: string]: string },
            };
        } catch (error) {
            console.error(
                `Error with ${this.config.method.toUpperCase()} request:`,
                (error as any).response || (error as any).message
            );
            throw error;
        }
    }

    static builder<T, U>(): Request<T, U> {
        return new Request();
    }
}
