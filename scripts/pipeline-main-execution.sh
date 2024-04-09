#!/bin/bash

# Run the tests using Jest
SUITE=$SUITE ENV=$ENV INSTANCES=$INSTANCES npm run test

# Execute generate-allure-report.sh script
chmod +x scripts/generate-allure-report.sh
scripts/generate-allure-report.sh

# Execute extraction of test summary results
npx ts-node src/utils/test-summary-extractor.ts

# Execute slack-notification.sh script
chmod +x scripts/slack-notification.sh
scripts/slack-notification.sh
