import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RequestHistory = sequelize.define("RequestHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  requestId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  previousStatus: { type: DataTypes.STRING },
  newStatus: { type: DataTypes.STRING },
  changedBy: { type: DataTypes.STRING }, // usuario que realizó la acción
  comment: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
  tableName: "request_histories"
});

export default RequestHistory;
