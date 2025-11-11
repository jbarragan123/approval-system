import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  approver: { type: DataTypes.STRING, allowNull: false },
  requestId: { type: DataTypes.UUID, allowNull: false },
  title: DataTypes.STRING,
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
  tableName: "notifications"
});

export default Notification;
