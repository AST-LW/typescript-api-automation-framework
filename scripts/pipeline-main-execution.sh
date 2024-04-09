#!/bin/bash

# Run the tests using Jest
SUITE=$SUITE ENV=$ENV INSTANCES=$INSTANCES npx jest

# Execute generate-allure-report.sh script
chmod +x scripts/util-scripts/generate-allure-report.sh
scripts/util-scripts/generate-allure-report.sh

# Execute extraction of test summary results
npx ts-node src/utils/test-summary-extractor.ts

# Execute slack-notification.sh script
chmod +x scripts/util-scripts/slack-notification.sh
scripts/util-scripts/slack-notification.sh
