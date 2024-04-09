#!/bin/bash

# Read the webhook URL from the environment variable
webhook_url="$SLACK_WEBHOOK_URL"

# Exit if the SLACK_WEBHOOK_URL is not set
if [ -z "$webhook_url" ]; then
    echo "SLACK_WEBHOOK_URL environment variable is not set."
    exit 1
fi

# Read test summary from a JSON file
test_summary=$(cat test-summary.json)

# Extract properties from the JSON using awk and ensure proper escaping of JSON values
suite_name=$(echo "$test_summary" | awk -F '[:,]' '/suite/ {gsub(/["{} ]/, "", $2); print $2}')
total_passed=$(echo "$test_summary" | awk -F '[:,]' '/totalPassed/ {gsub(/[" ]/, "", $2); print $2}')
total_failed=$(echo "$test_summary" | awk -F '[:,]' '/totalFailed/ {gsub(/[" ]/, "", $2); print $2}')
total_broken=$(echo "$test_summary" | awk -F '[:,]' '/totalBroken/ {gsub(/[" ]/, "", $2); print $2}')
total_duration=$(echo "$test_summary" | awk -F '[:,]' '/totalDuration/ {gsub(/[" ]/, "", $2); print $2}')
env=$(echo "$test_summary" | awk -F '[:,]' '/env/ {gsub(/[" ]/, "", $2); print $2}')

# Use total duration directly
total_duration_formatted="$total_duration"

# Define the message payload with an attachment and blocks
message_payload=$(cat <<EOF
{
    "attachments": [
        {
            "color": "#7CD197",
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Test Summary: ${suite_name} Suite"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": "Environment: ${env}"
                        }
                    ]
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Total Passed:* \`${total_passed}\`"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Failed:* \`${total_failed}\`"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Broken:* \`${total_broken}\`"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Duration:* \`${total_duration_formatted}\`"
                        }
                    ]
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": "This summary provides an overview of the test outcomes from the latest ${suite_name} testing cycle."
                        }
                    ]
                }
            ]
        }
    ]
}
EOF
)

# Send the message using curl
curl -X POST -H 'Content-type: application/json' --data "$message_payload" "$webhook_url"
