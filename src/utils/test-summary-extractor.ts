import fs from "fs";
import path from "path";
import { StringOperations } from "./string-operations";

const extractAllureSummary = async () => {
    let summary = {
        totalPassed: 0,
        totalFailed: 0,
        totalBroken: 0,
        totalDurationMs: 0,
    };

    try {
        const testCasesPath = process.cwd() + "/allure-report/data/test-cases";
        const files = fs.readdirSync(`${testCasesPath}`);
        const jsonFiles = files.filter((file) => file.endsWith(".json"));

        for (let file of jsonFiles) {
            const filePath = path.join(file);
            const fileContent = fs.readFileSync(`${testCasesPath}` + "/" + filePath, "utf8");
            const testCase = JSON.parse(fileContent);

            // Add up durations
            summary.totalDurationMs += testCase.time.duration;

            // Count pass/fail/broken statuses
            switch (testCase.status) {
                case "passed":
                    summary.totalPassed += 1;
                    break;
                case "failed":
                    summary.totalFailed += 1;
                    break;
                case "broken":
                    summary.totalBroken += 1;
                    break;
                // Add more cases if there are other statuses
            }
        }

        // Additional metadata
        summary["env"] = process.env.ENV || "qa";
        summary["suite"] = StringOperations.capitalizeFirstLetter(process.env.SUITE || "regression");
        console.log(summary);

        // Format the total duration into hours, minutes, and seconds
        (summary as any).totalDuration = formatDuration(summary.totalDurationMs);
        delete (summary as any).totalDurationMs; // Remove the milliseconds duration from the summary
    } catch (error) {
        console.error("Error reading test case files:", error);
        throw error;
    }

    fs.writeFileSync(process.cwd() + "/test-summary.json", JSON.stringify(summary), "utf-8");
    return summary;
};

const formatDuration = (durationMs: number): string => {
    let seconds = Math.floor(durationMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    const hoursStr = hours.toString().padStart(2, "0") + "h";
    const minutesStr = minutes.toString().padStart(2, "0") + "m";
    const secondsStr = seconds.toString().padStart(2, "0") + "s";

    return hoursStr + "-" + minutesStr + "-" + secondsStr;
};

extractAllureSummary();
