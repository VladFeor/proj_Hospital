const { Sequelize } = require('sequelize')
const db_config = require('../config/bd.config')
const sequelize = new Sequelize(db_config.database,db_config.username,db_config.password,db_config.options);


(async ()=>{
    try{
       await sequelize.authenticate()
    }
    catch(err){
        console.log(err)
    }
})()    


const User = require('./user')(sequelize);
const Patient = require('./patient')(sequelize);
const Doctor = require('./doctor')(sequelize);
const Pill = require('./pill')(sequelize);
const Visit = require('./visit')(sequelize);
const Illnes = require('./illnes')(sequelize);
const Dispensina = require('./dispensina')(sequelize);


// Visit - Patient +  Doctor

Patient.hasMany(Visit, { foreignKey: 'patientId' });
Visit.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Visit, { foreignKey: 'doctorId' });
Visit.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Illnes - Patient + Doctor

Patient.hasMany(Illnes, { foreignKey: 'patientId' });
Illnes.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Illnes, { foreignKey: 'doctorId' });
Illnes.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Dispensina - Illnes + Doctor + Pill

Illnes.hasMany(Dispensina, { foreignKey: 'illnesId' });
Dispensina.belongsTo(Illnes, { foreignKey: 'illnesId' });

Doctor.hasMany(Dispensina, { foreignKey: 'doctorId' });
Dispensina.belongsTo(Doctor, { foreignKey: 'doctorId' });

Pill.hasMany(Dispensina, { foreignKey: 'pillId' });
Dispensina.belongsTo(Pill, { foreignKey: 'pillId' });




(async ()=>{
    try{
       await sequelize.sync()
    }
    catch(err){
        console.log(err)
    }
})()


module.exports = {
    User,
    Patient,
    Doctor,
    Pill,
    Visit,
    Illnes,
    Dispensina
}