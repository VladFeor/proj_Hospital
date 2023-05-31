const DataTypes = require('sequelize')
module.exports = (sequelize) =>{
    return sequelize.define('Illnes',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        patientId:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        doctorId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        disease:{
            type:DataTypes.STRING,
            allowNull:false,
        }
        
    },{timrstamps:false,})
}