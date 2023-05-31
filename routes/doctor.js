const router = require('express').Router()
const { Doctor } = require('../modals')
const {Add,Delete,Search}  = require('../controlles/doctorController')



router.route('/doctors')
    .get( async (req,res) =>{
    const doctors =  await  Doctor.findAll()
    res.render('doctors',{
        title: 'Doctors Page',
        doctors,
    })
})
.post(Add)

router.route('/doctorSearch').get(Search)
router.route('/doctor/:id/delete').post(Delete)

module.exports = router