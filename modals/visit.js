const DataTypes = require('sequelize')
module.exports = (sequelize) =>{
    return sequelize.define('Visit',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        patientId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        doctorId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        dataOfVisit:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        disease:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        isCompleted:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        
    },{timrstamps:false,})
}