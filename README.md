# 🧩 Approval System

Sistema Fullstack de **aprobaciones y notificaciones internas**, desarrollado con:
- **Frontend:** Angular 20 + Bootstrap  
- **Backend:** Express + Sequelize (MySQL)  
- **Infraestructura:** Docker + Nginx

---


## ⚙️ Configuración del entorno

### Archivo `.env`
Ejemplo del archivo `.env` usado por el backend:

```bash
DB_HOST=db
DB_USER=root
DB_PASS=root
DB_NAME=approvals_db
DB_PORT=3306

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=approvals_db

NODE_ENV=development
PORT=3000
```

---

## 🐳 Ejecución con Docker

Asegúrate de tener **Docker** y **Docker Compose** instalados.  
Luego, desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto levantará los siguientes servicios:
- `db`: Base de datos MySQL  
- `backend`: API Node.js (Express + Sequelize)
- `frontend`: Aplicación Angular (compilada)
- `nginx`: Servidor que enruta tráfico entre frontend y backend  

Una vez levantado:
- 🌐 Frontend: http://localhost  
- ⚙️ Backend API: http://localhost/api  

---

## 🌱 Seeders automáticos

El backend ejecuta el archivo `seeders/01-initial-data.js` al arrancar (solo en modo desarrollo).  
Crea datos iniciales en las tablas:

- **Requests** (`Licencia Power BI`, `Despliegue Auth v1.2.0`, etc.)
- **RequestHistory** (historial de cambios)
- **Notifications** (notificaciones por usuario)

También puedes correrlos manualmente:

```bash
npm run seed
```

---

## 🧠 Endpoints API

### 📦 Requests

#### `GET /api/requests`
Obtiene todas las solicitudes registradas.

#### `GET /api/requests/:id`
Obtiene una solicitud específica por ID.

#### `POST /api/requests`
Crea una nueva solicitud.

#### `PUT /api/requests/:id`
Actualiza el estado de una solicitud.

#### `GET /api/requests/:id/history`
Obtiene el historial de cambios de una solicitud.

### 🔔 Notifications

#### `GET /api/notifications/:user`
Obtiene todas las notificaciones del usuario especificado.

---

## 🧩 Frontend (Angular)

### Scripts disponibles
```bash
npm start
npm run build
npm run watch
```

El frontend consume la API del backend a través de Nginx (`/api/...`).

### Tecnologías usadas
- Angular 20
- Bootstrap 5
- RxJS
- FormsModule / ngModel
- Comunicación con backend mediante `HttpClient`

---

## ⚙️ Backend (Express + Sequelize)

- **Sequelize ORM** con MySQL  
- **Modelos principales:** Request, RequestHistory, Notification  
- **Rutas RESTful**
- **CORS habilitado** (`http://localhost:4200`)
- **Seeders automáticos** en entorno de desarrollo

---

## 🧱 Nginx Proxy

Archivo `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🧾 Licencia
Proyecto desarrollado con fines académicos y de práctica técnica (Fullstack Developer Challenge).

---

## 👨‍💻 Autor
**Juan Barragán**
