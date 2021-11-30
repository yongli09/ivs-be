FROM node:lts-slim

# Create app directory
WORKDIR /usr/src/ivs-be

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production 

# Bundle app source
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "server.js"]