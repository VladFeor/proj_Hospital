const DataTypes = require('sequelize')

module.exports = (sequelize) =>{
    return sequelize.define('Pill',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            unique: true,
            allowNull:false,
        },
        reason:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
        
    },{timrstamps:false,})
}