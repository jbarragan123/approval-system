// seeders/01-initial-data.js
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../src/config/db.js';
import Request from '../src/models/request.model.js';
import RequestHistory from '../src/models/requestHistory.model.js';
import Notification from '../src/models/notification.model.js';

dotenv.config({ path: '/app/.env' });  

const seed = async () => {
  console.log('Iniciando seeder...');

  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa');

    await sequelize.sync({ force: true });
    console.log('Tablas sincronizadas correctamente')

    // LIMPIEZA CORRECTA
    console.log('Eliminando datos antiguos...');
    await RequestHistory.destroy({ where: {}, force: true });
    await Notification.destroy({ where: {}, force: true });
    await Request.destroy({ where: {}, force: true });
    console.log('Datos antiguos eliminados');

    // === SOLICITUDES ===
    const requests = await Request.bulkCreate([
      {
        id: uuidv4(),
        title: 'Licencia Power BI',
        description: 'Necesito acceso a Power BI para reportes mensuales',
        requester: 'tatiana.parra',
        approver: 'juan.perez',
        type: 'access',
        status: 'PENDING',
      },
      {
        id: uuidv4(),
        title: 'Despliegue Auth v1.2.0',
        description: 'Publicar microservicio de autenticación',
        requester: 'carlos.gonzales',
        approver: 'juan.perez',
        type: 'deployment',
        status: 'PENDING',
      },
      {
        id: uuidv4(),
        title: 'Acceso SSH QA',
        description: 'Pruebas automatizadas',
        requester: 'juan.perez',
        approver: 'tatiana.parra',
        type: 'access',
        status: 'APPROVED',
        comment: 'Acceso temporal aprobado',
      },
    ]);

    console.log(`${requests.length} solicitudes creadas`);

    // === HISTORIAL ===
    await RequestHistory.bulkCreate([
      { id: uuidv4(), requestId: requests[0].id, newStatus: 'PENDING', changedBy: 'tatiana.parra', comment: 'Solicitud creada' },
      { id: uuidv4(), requestId: requests[1].id, newStatus: 'PENDING', changedBy: 'carlos.gonzales', comment: 'Solicitud creada' },
      { id: uuidv4(), requestId: requests[2].id, newStatus: 'PENDING', changedBy: 'juan.perez', comment: 'Solicitud creada' },
      { id: uuidv4(), requestId: requests[2].id, previousStatus: 'PENDING', newStatus: 'APPROVED', changedBy: 'tatiana.parra', comment: 'Acceso temporal aprobado' },
    ]);

    // === NOTIFICACIONES ===
    await Notification.bulkCreate([
      { id: uuidv4(), recipient: 'juan.perez', message: 'Nueva solicitud: Licencia Power BI', requestId: requests[0].id },
      { id: uuidv4(), recipient: 'juan.perez', message: 'Despliegue pendiente: Auth v1.2.0', requestId: requests[1].id },
      { id: uuidv4(), recipient: 'tatiana.parra', message: 'Solicitud aprobada: Acceso SSH QA', requestId: requests[2].id },
    ]);

    console.log('SEEDER COMPLETADO CON ÉXITO');
    process.exit(0);
  } catch (error) {
    console.error('ERROR EN SEEDER:', error.message);
    process.exit(1);
  }
};

seed();