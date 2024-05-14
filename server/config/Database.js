import { Sequelize } from "sequelize";
 
const db = new Sequelize('cust_portal', 'root', 'mysql', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;