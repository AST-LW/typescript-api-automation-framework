import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "../utils/env.loader";

type HttpMethod = {
    method: "get" | "post" | "patch" | "put" | "delete";
};

type RequestConfig = {
    method?: any;
    url?: any;
    params?: any;
    data?: any;
    headers?: any;
};

export class Request {
    private readonly baseUrl: string;
    private readonly client: AxiosInstance;
    private config: RequestConfig;

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

        console.log(this.baseUrl);
    }

    method(method: HttpMethod) {
        this.config.method = method;
        return this;
    }

    resourceEndpoint(resourceEndpoint: string) {
        this.config.url = resourceEndpoint;
        return this;
    }

    params(params: any) {
        this.config.params = {
            ...params,
        };
        return this;
    }

    payload(payload: any) {
        this.config.data = {
            ...payload,
        };
        return this;
    }

    headers(headers: any) {
        this.config.headers = {
            ...headers,
        };
        return this;
    }

    async send() {
        try {
            const response: AxiosResponse = await this.client.request(this.config);
            return response;
        } catch (error) {
            console.error(
                `Error with ${this.config.method.toUpperCase()} request:`,
                (error as any).response || (error as any).message
            );
            throw error;
        }
    }

    static builder(): Request {
        return new Request();
    }
}

Request.builder();
