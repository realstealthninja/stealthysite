# building frontend
FROM node:lts-slim AS frontend-builder

WORKDIR /frontend

# install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm ci
RUN npm install -g @angular/cli


# build frontend
COPY ./frontend/ ./

RUN ng build --configuration=production

FROM nginx:alpine AS frontend-server
COPY ./frontend/config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=frontend-builder  ./frontend/dist/frontend/browser/ /etc/nginx/html/
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
