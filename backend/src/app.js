import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import requestRoutes from "./routes/requests.routes.js";
import notificationRoutes from "./routes/notifications.routes.js"; 
import Request from "./models/request.model.js";
import "./models/requestHistory.model.js";
import "./models/notification.model.js"; 

const app = express();
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

// Rutas
app.use("/api/requests", requestRoutes);
app.use("/api/notifications", notificationRoutes); 

const PORT = 3000;
(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();
