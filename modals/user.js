const DataTypes = require('sequelize')
module.exports = (sequelize) =>{
    return sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
            type:DataTypes.STRING,
            unique: true,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
    },{timrstamps:false,})
}