# build stage
FROM node:lts-alpine as build-stage
WORKDIR /vue-fashe
COPY package*.json .
ADD . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /vue-fashe/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]