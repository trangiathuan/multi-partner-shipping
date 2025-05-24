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

# Expose port NestJS (default 8888)
EXPOSE 8001

RUN npx prisma generate

# Run in dev mode with hot reload
CMD ["npm", "run", "start:dev"]
