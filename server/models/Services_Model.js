import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Services = db.define('services_cp', {
    ID: {
        type: DataTypes.INTEGER
    },
    ServiceName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false
    },
    URL: {
        type: DataTypes.STRING
    },
    // ServiceImage: {
    //     type: DataTypes.BLOB('long')
    // }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Services;
