FROM strapi/base

WORKDIR /strapi

COPY ./package.json ./

RUN npm install --only=prod

COPY . .

RUN npm build
EXPOSE 1337

ENV NODE_ENV production

CMD ["npm", "start"]