FROM node AS build

COPY . /app
WORKDIR /app
RUN npm install
RUN yarn build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html