# Stage 1: Build React app
FROM node:18-alpine
WORKDIR /app
COPY . .

EXPOSE 3000
RUN npm install \
  @opentelemetry/api@latest \
  @opentelemetry/sdk-trace-web@latest \
  @opentelemetry/instrumentation-fetch@latest \
  @opentelemetry/instrumentation-document-load@latest \
  @opentelemetry/exporter-trace-otlp-http@latest \
  @opentelemetry/resources@latest \
  @opentelemetry/semantic-conventions@latest
RUN npm install serve -g
RUN npm install && npm run build
RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["serve", "-s", "dist", "-l", "3000"]
