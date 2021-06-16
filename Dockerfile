FROM node:16.3-slim

WORKDIR /code

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
COPY . .
CMD [ "npm", "run", "dev"]

# TODO add producation image