export class MathOperations {
    static generateRandomNumbers(min: number = 1, max: number = 100): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
