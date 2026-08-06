FROM gradle:jdk21-alpine AS backend-builder

WORKDIR /backend

ENV GRADLE_USER_HOME /cache

COPY backend/build.gradle.kts backend/settings.gradle.kts ./

RUN --mount=type=cache,target=/cache gradle dependencies --no-daemon --stacktrace


COPY backend/src ./src

# Build backend
RUN --mount=type=cache,target=/cache gradle build -x test --parallel --no-daemon --stacktrace

# runtime
FROM gcr.io/distroless/java21-debian13 AS runtime

# copy over the built jar file for execution
COPY --from=backend-builder /backend/build/libs/backend.jar /app/backend.jar

WORKDIR /app

# expose our port
EXPOSE 8080

# run the program
CMD ["backend.jar", "--spring.profiles.active=prod"]