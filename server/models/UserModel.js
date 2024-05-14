import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Services from "./Services_Model.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define(
  "user_cp",
  {
    ID: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    Organization: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
 
// Users.belongsTo(Services,{
//     foreignKey: "Services", // This should match the column name in user_cp table
//     targetKey: "ServiceName" // This should match the column name in services_cp table
// })
 
export default Users;
 