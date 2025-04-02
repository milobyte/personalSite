#Defining Noe.js runtime image
FROM node:23-alpine

#Create a app dir
WORKDIR /app

#Copy package files
COPY package*.json ./

#Install dependencies
RUN npm install

#Bundle app source
COPY . .

#Expose a port for the app
EXPOSE 3000

#Defining run command
CMD [ "npm", "start" ]