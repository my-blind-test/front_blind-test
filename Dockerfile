FROM node

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "yarn", "start"]