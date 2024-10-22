# Build stage
FROM rust:1.75-slim-bullseye as builder

WORKDIR /usr/src/app

# Install required dependencies
RUN apt-get update && \
    apt-get install -y pkg-config libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy manifests
COPY Cargo.toml Cargo.lock ./

# Create a dummy main.rs to build dependencies
RUN mkdir src && \
    echo "fn main() {}" > src/main.rs

# Build dependencies
RUN cargo build --release

# Remove the dummy build artifacts
RUN rm -rf src target/release/deps/platform-api*

# Copy the actual source code
COPY src src/

# Build the application
RUN cargo build --release

# Runtime stage
FROM debian:bullseye-slim

WORKDIR /usr/local/bin

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y libssl1.1 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy the binary from builder
COPY --from=builder /usr/src/app/target/release/platform-api ./app

# Expose the port your app runs on
EXPOSE 3001

# Run the binary
CMD ["./app"]