# Build
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Run
FROM eclipse-temurin:21-jre-jammy
# Create a non-root user and group
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
COPY jar/opentelemetry-javaagent.jar opentelemetry-javaagent.jar
# Set permissions for the app.jar file
RUN chown appuser:appgroup app.jar
USER appuser
EXPOSE 8080

ENV OTEL_SERVICE_NAME=backend
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://tempo:4317
ENV OTEL_TRACES_EXPORTER=otlp

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-javaagent:opentelemetry-javaagent.jar", "-jar", "app.jar"]
