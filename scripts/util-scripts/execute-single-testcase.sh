#!/bin/bash

# Loading the environment variables if any

chmod +x scripts/util-scripts/clear-reports.sh
scripts/util-scripts/clear-reports.sh

# Run Jest tests with specified test name pattern
npx jest --testNamePattern=\'\@TEST_ID-"$1"\'
