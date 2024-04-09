#!/bin/bash

# Read the webhook URL from the environment variable
webhook_url="$SLACK_WEBHOOK_URL"

# Exit if the SLACK_WEBHOOK_URL is not set
if [ -z "$webhook_url" ]; then
    echo "SLACK_WEBHOOK_URL environment variable is not set."
    exit 1
fi

# Read test summary from a JSON file
ROOT_DIR="$(git rev-parse --show-toplevel)"
test_summary=$(cat $ROOT_DIR/test-summary.json)

# # Extract properties using grep and awk
# total_passed=$(echo "$test_summary" | grep "totalPassed" | awk -F ': ' '{print $2}' | tr -d ',}')
# total_failed=$(echo "$test_summary" | grep "totalFailed" | awk -F ': ' '{print $2}' | tr -d ',}')
# total_broken=$(echo "$test_summary" | grep "totalBroken" | awk -F ': ' '{print $2}' | tr -d ',}')
# env=$(echo "$test_summary" | grep "\"env\"" | awk -F ': ' '{print $2}' | tr -d ',"}')
# suite_name=$(echo "$test_summary" | grep "\"suite\"" | awk -F ': ' '{print $2}' | tr -d ',"}')
# total_duration=$(echo "$test_summary" | grep "totalDuration" | awk -F ': ' '{print $2}' | tr -d '",}')

# Extract properties using jq
total_passed=$(echo "$test_summary" | jq '.totalPassed')
total_failed=$(echo "$test_summary" | jq '.totalFailed')
total_broken=$(echo "$test_summary" | jq '.totalBroken')
env=$(echo "$test_summary" | jq -r '.env')
suite_name=$(echo "$test_summary" | jq -r '.suite')
total_duration_ms=$(echo "$test_summary" | jq '.totalDurationMs')

ls -a
echo "Total Passed: $total_passed"
echo "Total Failed: $total_failed"
echo "Total Broken: $total_broken"
echo "Environment: $env"
echo "Suite Name: $suite_name"
echo "Total Duration: $total_duration"

# Use total duration directly
total_duration_formatted="$total_duration"

# Define the color based on the test results
message_color="#36a64f" # green for success

# Define the message payload with an attachment and blocks
message_payload=$(cat <<EOF
{
    "attachments": [
        {
            "color": "$message_color",
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Test Summary: $suite_name Suite"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": "Environment: $env"
                        }
                    ]
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Total Passed:* \`$total_passed\`"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Failed:* \`$total_failed\`"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Broken:* \`$total_broken\`"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Duration:* \`$total_duration_formatted\`"
                        }
                    ]
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": "This summary provides an overview of the test outcomes from the latest $suite_name testing cycle."
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
