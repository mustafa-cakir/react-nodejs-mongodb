FROM node:16.14-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN yarn install && yarn build
# production environment
FROM nginx:1.19.2-alpine
COPY --from=build /usr/src/app/build /var/www
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

