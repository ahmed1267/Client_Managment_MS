# Use the official Node.js image as the base image
FROM node:20.10

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy application source code to the working directory
COPY . .

# Expose the application port (optional based on your application configuration)
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
