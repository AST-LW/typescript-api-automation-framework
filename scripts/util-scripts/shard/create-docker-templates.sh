#!/bin/bash

# Set the shard-workspace directory
shard_workspace="shard-workspace"

# Create the shard-workspace directory if it doesn't exist
mkdir -p "$shard_workspace"

# Create Base Dockerfile for installing node modules
base_dockerfile="$shard_workspace/Dockerfile_base"
cat > "$base_dockerfile" <<EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
EOF

# Read the splitted-tests.json file
splitted_tests_json=$(cat "$shard_workspace/splitted-tests.json")

# Get the list of container names
container_names=($(echo "$splitted_tests_json" | jq -r 'keys[]'))

# Generate Docker templates for each container using the base image
for container_name in "${container_names[@]}"; do
  echo "Generating Docker template for container: $container_name"

  # Create the Dockerfile for each container
  dockerfile_name="$shard_workspace/Dockerfile_$container_name"
  cat > "$dockerfile_name" <<EOL
FROM base-image

COPY --from=base-image /app/node_modules ./node_modules
COPY . .

ENV CONTAINER_NAME=$container_name
ENV TEST_SET='$(echo "$splitted_tests_json" | jq -r ".\"$container_name\"" | sed 's|\./|<rootDir>/|g' | jq -c .)'

CMD ["npx", "jest"]
EOL
done
