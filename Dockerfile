FROM node:14.16-alpine3.10 as dependencies
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
COPY --from=dependencies /usr/app/dist
EXPOSE 80
