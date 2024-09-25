FROM node:14.18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
#RUN npm ci --only=production

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]