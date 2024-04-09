#!/bin/bash

# Set the test directory and suite name
test_dir="./tests/regression/sample"
suite_name="sample"

# Get the list of test files based on the suite name
test_files=($(find "${test_dir}" -name "*.spec.ts" -type f))

# Get the total number of test files
total_files=${#test_files[@]}

# Set the desired number of containers
container_count=2

# Set the CONTAINERS_COUNT environment variable
export CONTAINERS_COUNT=$container_count

# Initialize an array to store the test file chunks
file_chunks=()

# Divide the test files equally among the containers
for ((i=0; i<total_files; i++)); do
  container_index=$((i % container_count))
  file_chunks[$container_index]="${file_chunks[$container_index]},\"${test_files[i]}\""
done

# Create the shard-workspace directory if it doesn't exist
mkdir -p shard-workspace

# Generate the splitted-tests.json file
echo "{" > shard-workspace/splitted-tests.json
for ((i=0; i<container_count; i++)); do
  container_key="container_$((i + 1))"
  echo "  \"$container_key\": [${file_chunks[i]:1}]" >> shard-workspace/splitted-tests.json
  if ((i < container_count - 1)); then
    echo "," >> shard-workspace/splitted-tests.json
  fi
done
echo "}" >> shard-workspace/splitted-tests.json