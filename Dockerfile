FROM node

WORKDIR /front

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev"]
