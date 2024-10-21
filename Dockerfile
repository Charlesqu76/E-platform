# Use the official Rust image as a builder
FROM rust:latest as builder

# Set the working directory
WORKDIR /usr/src/myapp

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Create a dummy source file to help cargo fetch dependencies
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Build the dependencies
RUN cargo build --release
# Now remove the dummy source file
RUN rm -f target/release/deps/myapp*

# Copy the source code
COPY . .

# Build the actual application
RUN cargo build --release

# Use a smaller image for the final build
FROM debian:buster-slim

# Copy the built binary from the builder image
COPY --from=builder /usr/src/myapp/target/release/myapp .

# Expose the port the app runs on
EXPOSE 3001

# Run the application
CMD ["./myapp"]
