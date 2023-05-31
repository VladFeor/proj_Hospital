const router = require('express').Router()
const {Add,Delete,Search}  = require('../controlles/pillController')
const { Pill } = require('../modals')
const { Sequelize, DataTypes } = require('sequelize');



router.route('/pills')
    .get( async (req,res) =>{
    const pills =  await  Pill.findAll()
    res.render('pills',{
        title: 'Pills Page',
        pills,
    })
})
.post(Add)
router.route('/pillSearch').get(Search)
router.route('/pill/:id/delete').post(Delete)

module.exports = router