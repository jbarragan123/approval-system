# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instala mysql-client para mysqladmin ping
RUN apk add --no-cache mysql-client

COPY package*.json ./
RUN npm install

# Copia TODO el código
COPY . .

# Copia el entrypoint desde backend/
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

# CORRECTO: Usa /bin/sh para ejecutar el script
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]
CMD ["npm", "start"]