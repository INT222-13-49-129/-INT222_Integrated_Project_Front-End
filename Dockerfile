FROM node:14.16-alpine3.10 as step01
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
COPY --from=step01 /usr/app/dist ./
EXPOSE 80
