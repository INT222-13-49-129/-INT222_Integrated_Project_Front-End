
FROM node:14.16-alpine3.10 as step01
WORKDIR /frontend/src
COPY ./package.json /frontend/src/package.json
RUN npm install
COPY . /frontend/src
RUN npm run build

# ENV HOST 0.0.0.0   
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=step01 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["npm", "run", "start"]