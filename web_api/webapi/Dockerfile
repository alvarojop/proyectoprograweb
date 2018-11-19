FROM node:8

WORKDIR /usr/src/webapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
