#!/bin/bash
set -e

echo "Esperando a MySQL (${DB_HOST:-db}:3306)..."

# Instala netcat si no está (opcional, ya lo hacemos en Dockerfile)
# Pero mejor: usamos ping simple
until mysqladmin ping -h"${DB_HOST:-db}" -P 3306 --silent; do
  echo "MySQL no responde... reintentando en 2s"
  sleep 2
done

echo "MySQL conectado!"

# Ejecuta seeders SOLO en desarrollo
if [ "$NODE_ENV" = "development" ]; then
  echo "Ejecutando seeders..."
  if node -r dotenv/config seeders/01-initial-data.js dotenv_config_path=/app/.env; then
    echo "Seeders ejecutados correctamente"
  else
    echo "ADVERTENCIA: Seeders fallaron (continuando...)"
  fi
else
  echo "Modo producción: seeders desactivados"
fi

echo "Iniciando backend..."
exec "$@"