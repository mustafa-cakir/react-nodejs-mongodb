FROM node:16.14-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["yarn", "watch:dev"]
