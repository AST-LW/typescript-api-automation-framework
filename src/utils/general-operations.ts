import { v5 as uuidv5 } from "uuid";

export class GeneralOperations {
    static generateTestNameAsUUID(testName: string) {
        const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        return uuidv5(testName, namespace);
    }
}
