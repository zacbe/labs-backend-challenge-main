FROM node:18-alpine

WORKDIR /app
COPY . /app
RUN npm install

# Install SQLite3 in the container
RUN apk add --no-cache sqlite

# Bundle app source
COPY . .

EXPOSE 8081
ENTRYPOINT ["node", "dist/index.js"]