const router = require('express').Router()
const {Delete,Search}  = require('../controlles/illnesController')
const { Illnes, Patient, Doctor } = require('../modals')
const { Sequelize, DataTypes } = require('sequelize');



router.route('/illness')
    .get( async (req,res) =>{
    const illness =  await  Illnes.findAll()
    const finishIllness = []
    illness.map(async (element) =>{
        const patient = await Patient.findOne({where:{id:element.patientId}})
        const doctor =  await Doctor.findOne({where:{id:element.doctorId}})
        finishIllness.push( {
            id: element.id,
            patient:  `${patient.name} ${patient.surname}`,
            doctor: `${doctor.name} ${doctor.surname}`,
            dataOfVisit: element.dataOfVisit,
            disease: element.disease,
        })
    })
    res.render('illness',{
        title: 'Illness Page',
        finishIllness,
    })
})
router.route('/illnesSearch').get(Search)
router.route('/illnes/:id/delete').post(Delete)

module.exports = router