import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; 

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  requestId: { 
    type: DataTypes.UUID,
    allowNull: true,
  },
});

export default Notification;
