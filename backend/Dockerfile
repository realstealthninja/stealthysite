FROM gradle:jdk21-alpine AS backend-cache
WORKDIR /backend
ENV GRADLE_USER_HOME /cache
COPY ./backend/build.gradle.kts ./backend/settings.gradle.kts ./
RUN gradle build --no-daemon || return 0


# building backend
FROM gradle:jdk21-alpine AS backend-builder

WORKDIR /backend

COPY --from=backend-cache /cache /home/gradle/.gradle
COPY ./backend/ ./

# Build backend
RUN gradle clean build --parallel --no-daemon -x test

# runtime
FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app

# copy over the built jar file for execution
COPY --from=backend-builder ./backend/build/libs/backend.jar /app/backend.jar

# expose our port
EXPOSE 8080

# run the program
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]