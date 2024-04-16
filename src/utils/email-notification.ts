import { Resend } from "resend";
import fs from "fs";

const REPORT_TO_SEND = process.env.REPORT_TO_SEND;
const resend = new Resend("re_exrSrjvb_vTjWWJzGKtkcmTit8WQvNdum");

const sendReport = async () => {
    const testSummaryPath = process.cwd() + "/test-summary.json";
    const testSummary = JSON.parse(fs.readFileSync(testSummaryPath, "utf-8"));
    const { totalPassed, totalFailed, totalBroken, env, suite, totalDuration } = testSummary;

    const emailBody = `
    <html>
    <head>
    <style>
    table {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    th {
        background-color: #f2f2f2;
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    </style>
    </head>
    <body>

    <h2 style="color: #4CAF50;">Test Summary: ${suite} Suite</h2>
    <p><strong>Environment:</strong> ${env}</p>
    <table>
    <tr>
        <th>Total Passed</th>
        <th>Total Failed</th>
        <th>Total Broken</th>
        <th>Total Duration</th>
    </tr>
    <tr>
        <td>${totalPassed}</td>
        <td>${totalFailed}</td>
        <td>${totalBroken}</td>
        <td>${totalDuration}</td>
    </tr>
    </table>

    <p>This summary provides an overview of the test outcomes from the latest ${suite} testing cycle.</p>

    </body>
    </html>
    `;

    const recipients = JSON.parse(REPORT_TO_SEND as string) as string[];
    const emailObjects = recipients.map((recipient) => {
        return {
            from: "onboarding@resend.dev",
            to: [recipient],
            subject: "Test Report",
            html: emailBody,
        };
    });
    const result = await resend.batch.send([...emailObjects]);
};

(async () => {
    await sendReport();
})();
