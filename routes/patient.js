const router = require('express').Router()
const {Add,Delete,Search}  = require('../controlles/creating')
const { Patient } = require('../modals')
const { Sequelize, DataTypes } = require('sequelize');
const helpers = require('./helpers'); // Путь к файлу helpers.js



router.route('/patients')
    .get( async (req,res) =>{
    const patients =  await  Patient.findAll()
    res.render('patients',{
        title: 'Patient Page',
        patients,
    })
})
.post(Add)
router.route('/patientSearch').get(Search)
router.route('/patient/:id/delete').post(Delete)

module.exports = router