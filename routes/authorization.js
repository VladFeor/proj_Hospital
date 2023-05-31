const router = require('express').Router()
const {Registration,Logining}  = require('../controlles/auntification')


router.route('/registration')
    .get((req,res) =>{
    res.render('registration',{
        title: 'Auth Page',
        isHome: true
    })
    
})
.post(Registration)

router.route('/login')
    .get((req,res) =>{
    res.render('login',{
        title: 'Login Page',
        isHome: true
    })
})
.post(Logining)


module.exports = router