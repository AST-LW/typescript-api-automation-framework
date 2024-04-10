import { faker } from "@faker-js/faker";
import { MathOperations } from "./math-operations";

export class DataGenerator {
    static generateUsername(): string {
        return faker.internet.userName();
    }

    static generateEmail(username: string): string {
        return `${username}@example.com`;
    }

    static generateTaskTitle(): string {
        const randomNumber = MathOperations.generateRandomNumbers();
        return `This is the title of the task - ${randomNumber}`;
    }

    static generateTaskDescription(): string {
        const randomNumber = MathOperations.generateRandomNumbers();
        return `This is the description of the task - ${randomNumber}`;
    }
}
