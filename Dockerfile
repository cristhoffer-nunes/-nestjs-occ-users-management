FROM node

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE ${PORT}

ENV MONGODB_URL=${MONGODB_URL} \
    MONGODB_COLLECTION=${MONGODB_COLLECTION}

RUN yarn build
   
CMD ["yarn", "start:prod"]