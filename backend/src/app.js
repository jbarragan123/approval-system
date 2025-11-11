import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import requestRoutes from "./routes/requests.routes.js";
import Request from "./models/request.model.js";
import "./models/requestHistory.model.js";

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use("/api/requests", requestRoutes);

const PORT = 3000;
(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();
