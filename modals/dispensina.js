const DataTypes = require('sequelize')
module.exports = (sequelize) =>{
    return sequelize.define('Dispensina',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        illnesId:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        doctorId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        pillId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        dataOfDispansina:{
            type:DataTypes.DATE,
            allowNull:false,
        }
        
    },{timrstamps:false,})
}