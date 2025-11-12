// backend/src/config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// CARGAR .env DESDE /app/.env (ruta absoluta en Docker)
dotenv.config({ path: '/app/.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'approvals_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',  // ← AUNQUE ESTÉ, SI NO SE CARGA, USA ''
  {
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
  }
);

export default sequelize;