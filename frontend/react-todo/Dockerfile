
# Stage 1: Build the React application
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Build production files
RUN npm run build


# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy React build files into Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose frontend port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
