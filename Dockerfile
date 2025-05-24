# syntax=docker/dockerfile:1
# building frontend
FROM node:lts-alpine as frontend-builder

WORKDIR /frontend

COPY ./frontend .

# install dependencies
RUN npm install
RUN npm install -g @angular/cli

# build frontend
RUN ng build --configuration=production

# building backend
FROM eclipse-temurin:21-jdk as backend-builder

WORKDIR /backend

# copy project files over
COPY ./backend .

# get static files from frontend 
COPY --from=frontend-builder ./frontend/dist/frontend/browser/ ./src/main/resources/static

RUN ./gradlew build

# runtime

FROM eclipse-temurin:21-jre as runtime

WORKDIR /app

# copy over the built jar file for execution
COPY --from=backend-builder ./backend/build/libs/backend.jar /app/backend.jar

# expose our port
EXPOSE 8080

# run the program
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]