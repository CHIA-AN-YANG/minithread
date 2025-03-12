FROM node:20.18.0-alpine

ENV NEXT_PUBLIC_API_PORT=8080
ENV NEXT_PUBLIC_API_URL=http://localhost

# Set working directory
WORKDIR /frontend-app

# Copy package files
COPY package.json yarn.lock* ./


# Install dependencies
RUN yarn install --frozen-lockfile

COPY . .

RUN npm install -g next
RUN yarn build

# Expose ports
EXPOSE 3000

# Create start script
CMD ["yarn", "start"]