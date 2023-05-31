const DataTypes = require('sequelize')

module.exports = (sequelize) =>{
    return sequelize.define('Patient',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        surname:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        rank:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        dataOfBirth:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        numberPhone:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        
    },{timrstamps:false,})
}