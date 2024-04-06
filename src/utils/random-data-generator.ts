import { faker } from "@faker-js/faker";

export class DataGenerator {
    static generateUsername(): string {
        return faker.internet.userName();
    }

    static generateEmail(username: string): string {
        return `${username}@example.com`;
    }
}
