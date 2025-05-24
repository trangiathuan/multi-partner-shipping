# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Expose port (api-gateway mặc định chạy 8000)
EXPOSE 8000

# Run in dev mode
CMD ["npm", "run", "start"]
