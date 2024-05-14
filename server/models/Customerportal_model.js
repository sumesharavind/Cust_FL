    import { Sequelize } from "sequelize";
    import db from "../config/Database.js";
    // import Services from "./Services_Model.js";
    import Users from "./UserModel.js";

    const { DataTypes } = Sequelize;

    const Customerportal = db.define('customerservice_cp', {
        ID: {
            type: DataTypes.INTEGER
        },
        ServiceName: {    
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull:false
        }
    }, {     
        freezeTableName: true,
        timestamps: false
    });

    Customerportal.belongsTo(Users, {
        foreignKey: "ID", // This should match the column name in aggrattrtbl table
        targetKey: "ID", // This should match the column name in aggrdtltbl table
        
    })

    // Customerportal.belongsTo(Services, {
    //     foreignKey: "ServiceName", // This should match the column name in aggrattrtbl table
    //     targetKey: "ServiceName", // This should match the column name in aggrdtltbl table
        
    // })

    export default Customerportal;
