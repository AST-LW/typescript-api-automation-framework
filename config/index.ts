import QA_CONFIG from "./qa.config.json";

interface CONFIG_SIGNATURE {
    BASE_URL: string;
}

const fetchConfig = (): CONFIG_SIGNATURE => {
    switch (process.env.ENV) {
        case "qa":
        default:
            return QA_CONFIG as CONFIG_SIGNATURE;
    }
};

export const CONFIG = fetchConfig();
