const DataTypes = require('sequelize')

module.exports = (sequelize) =>{
    return sequelize.define('Doctor',{
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
        specialty:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
    },{timrstamps:false,})
}