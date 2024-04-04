import axios, { AxiosInstance, AxiosResponse } from "axios";
import Container, { Service } from "typedi";

import { Logger } from "./winston-logger";
import { LoggerToken } from "../../setup/globals";
import { CONFIG } from "../../config";

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

@Service({ transient: true })
export class Request<T, U> {
    private readonly baseUrl: string;
    private readonly client: AxiosInstance;
    private readonly logger: Logger;

    private config: RequestConfig<T>;

    constructor() {
        this.baseUrl = CONFIG.BASE_URL;

        this.client = axios.create({
            baseURL: this.baseUrl,
        });

        this.client.interceptors.response.use(
            (response) => {
                this.logger.info(
                    JSON.stringify({
                        statusCode: response.status,
                        data: response.data as U,
                        headers: response.headers as { [key: string]: string },
                    })
                );
                return response;
            },
            (error) => {
                this.logger.error(
                    JSON.stringify({
                        error: error.response,
                    })
                );
                return error.response;
            }
        );

        this.config = {};

        this.logger = Container.get(LoggerToken);
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
        this.logger.info(JSON.stringify(payload));
        return this;
    }

    async send(): Promise<ResponseConfig<U>> {
        try {
            this.logger.info(JSON.stringify(this.config));
            const response: AxiosResponse = await this.client.request(this.config);
            return {
                statusCode: response.status,
                data: response.data as U,
                headers: response.headers as { [key: string]: string },
            };
        } catch (error) {
            this.logger.error((error as any).message);
            return {
                statusCode: 0,
                data: {} as U,
                headers: {},
            };
        }
    }

    static builder<T, U>(): Request<T, U> {
        return new Request<T, U>();
    }
}
