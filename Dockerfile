FROM node:latest

WORKDIR /code

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
COPY . .
CMD [ "npm", "run", "dev"]

# TODO add producation image