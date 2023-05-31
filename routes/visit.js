const router = require('express').Router()
const { where } = require('sequelize')
const {Add,Delete}  = require('../controlles/visitController')
const {Patient, Doctor,Visit } = require('../modals')



router.route('/visiting')
    .get( async (req,res) =>{
    const visiting =  await  Visit.findAll()
    const finishVisiting = []
    visiting.map(async (element) =>{
        const patient = await Patient.findOne({where:{id:element.patientId}})
        const doctor =  await Doctor.findOne({where:{id:element.doctorId}})
        finishVisiting.push( {
            id: element.id,
            patient:  `${patient.name} ${patient.surname}`,
            doctor: `${doctor.name} ${doctor.surname}`,
            dataOfVisit: element.dataOfVisit,
            disease: element.disease,
            isCompleted: element.isCompleted
        })
    })
    const patients =  await  Patient.findAll()
    const doctors =  await  Doctor.findAll()
    res.render('visiting',{
        title: 'Visiting Page',
        finishVisiting,
        patients,
        doctors,
    })
})
.post(Add)
// router.route('/visitSearch').get(Search)
router.route('/visit/:id/delete').post(Delete)

module.exports = router