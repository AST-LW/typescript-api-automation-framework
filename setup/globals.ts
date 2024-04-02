import { Token } from "typedi";
import { Logger } from "../src/utils/winston-logger";

export const LoggerToken = new Token<Logger>("logger");
