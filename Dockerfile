#syntax=docker/dockerfile:1
# Development stage
FROM node:20.15.0-alpine as development

# Set the working directory
WORKDIR /app

# Copy package.json from root directory
COPY package.json .

RUN npm install -g npm@10.7.0

# Install all the required dependencies in the node_modules
RUN npm install

# Copy your application files (Except node_modules and build files, look .dockerignore file)
COPY . .

# Expose the development server port (e.g., 3000)
EXPOSE 8060

# Start the development server
CMD ["npm", "run", "dev"]
