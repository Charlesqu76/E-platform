# Build stage
FROM rust:1.75-slim-bullseye as builder

WORKDIR /usr/src/app

# Install required system dependencies if any
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire project
COPY . .

# Build the application
RUN cargo build --release

# Final stage
FROM debian:bullseye-slim

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl1.1 \
    && rm -rf /var/lib/apt/lists/*

# Copy the binary from builder
COPY --from=builder /usr/src/app/target/release/platform-api /usr/local/bin/platform-api

# Set the startup command
CMD ["platform-api"]

# Expose the port your app will run on
EXPOSE 3001