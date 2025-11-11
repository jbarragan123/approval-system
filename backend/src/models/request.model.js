import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const Request = sequelize.define("Request", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  requester: { type: DataTypes.STRING, allowNull: false },
  approver: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
    defaultValue: "PENDING",
  },
  comment: DataTypes.TEXT,
});

import RequestHistory from "./requestHistory.model.js";
Request.hasMany(RequestHistory, { foreignKey: "requestId" });
RequestHistory.belongsTo(Request, { foreignKey: "requestId" });

export default Request;
