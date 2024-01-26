#DOWNLOAD NODE IMAGE
FROM node:16.20.0-alpine3.16 as builder-stage
MAINTAINER jcarlos <josecarloshq@gmail.com>

#CREATE PROJECT DIR VAR
ENV UI_DIR=/core_ui

#CREATE A DIR PROJECT
RUN mkdir $UI_DIR

#SET WORKDIR INTO PROJECT DIR
WORKDIR $UI_DIR

ADD package.json $UI_DIR

ADD package-lock.json $UI_DIR

RUN npm install --only=production

RUN npm install --only=development

ADD . $UI_DIR

RUN node --version
#RUN npm run build --configuration production --aot
RUN npm run build

FROM nginx:latest

COPY --from=builder-stage /core_ui/dist /usr/share/nginx/html
COPY ./nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
