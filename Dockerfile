# Use official Node.js image as a base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3060

# Run the app
CMD ["npm", "run", "start:prod"]
