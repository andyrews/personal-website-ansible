# Stage 1: Build React app
FROM node:18-alpine
WORKDIR /app
COPY . .

EXPOSE 3000
RUN npm install serve
RUN npm install && npm run build
RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["/app/node_modules/.bin/serve", "-s", "dist", "-l", "3000"]
