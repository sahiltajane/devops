FROM node:18-alpine

WORKDIR /app
COPY server.js .

RUN npm install redis

HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
    CMD wget -q0- http://localhost:3000/health || exit 1

CMD [ "node","server.js" ]