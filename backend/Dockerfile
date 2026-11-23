
# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]
