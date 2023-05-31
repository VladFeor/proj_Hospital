const router = require('express').Router()
const { Dispensina,Doctor,Patient,Pill, Illnes } = require('../modals')
const {Add,Delete,Search}  = require('../controlles/dispensinaController')



router.route('/dispensinas')
    .get( async (req,res) =>{
    const dispensinas =  await  Dispensina.findAll()
    const illnesBeta =  await  Illnes.findAll()
    const doctors =  await  Doctor.findAll()
    const pills =  await  Pill.findAll()
    const illnes = []
    const finalDis = []


    dispensinas.map(async (element) =>{
        const befoteIllnes = await Illnes.findOne({where:{id:element.illnesId}})
        const illness = await Patient.findOne({where:{id:befoteIllnes.patientId}})
        const mainDoctor =  await Doctor.findOne({where:{id:befoteIllnes.doctorId}})
        const doctor =  await Doctor.findOne({where:{id:element.doctorId}})
        const pill =  await Pill.findOne({where:{id:element.pillId}})
        finalDis.push( {
            id: element.id,
            illness:  `${illness.name} ${illness.surname}`,
            mainDoctor: `${mainDoctor.name} ${mainDoctor.surname}`,
            doctor: `${doctor.name} ${doctor.surname}`, 
            pill: pill.name, 
            dataOfDispansina: element.dataOfDispansina,
        })
    })
    illnesBeta.map(async (element) =>{
        const patient = await Patient.findOne({where:{id:element.patientId}})
        const doctor =  await Doctor.findOne({where:{id:element.doctorId}})
        illnes.push( {
            id: element.id,
            patient:  `${patient.name} ${patient.surname}`,
            doctor: `${doctor.name} ${doctor.surname}`, 
            disease: element.disease,
        })
    })


    res.render('dispensinas',{
        title: 'Dispensinas Page',
        finalDis,
        illnes,
        doctors,
        pills
    })
})
.post(Add)
// router.route('/dispensinaSearch').get(Search)
router.route('/dispensina/:id/delete').post(Delete)

module.exports = router