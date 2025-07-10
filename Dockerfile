# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the React frontend
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE 8088

# Start the application
CMD ["npm", "start"]
