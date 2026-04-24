# Build stage
FROM node:22 AS build
WORKDIR /src
COPY . ./

RUN corepack enable
RUN yarn install --immutable

# Pass PUBLIC_PATH to the build process
ARG PUBLIC_PATH=/
ENV PUBLIC_PATH=${PUBLIC_PATH}
RUN PUBLIC_PATH=${PUBLIC_PATH} yarn run web:build:prod

# Release stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /src/web/.webpack ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
