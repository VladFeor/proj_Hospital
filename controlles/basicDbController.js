const {Doctor} = require('../modals')
const { Op } = require('sequelize');

const Add = async (req,res,) =>{
    const {name,surname,rank,specialty} = req.body
    const doctors = await Doctor.findAll()
    console.log(`dada${name}   ${surname}   ${rank}  ${specialty}`)
    if(!name || !surname || !rank || !specialty){
        res.status(400).send('Enter data')
        return;
    }
    try{
        const  doctors = await Doctor.create({name,surname,rank,specialty})
    }
    catch(err){
        res.status(500).send('Error')
        return;
    }
    res.render('/doctors')
}
const Delete = async (req,res) =>{
    const doctorId = req.params.id
    Doctor.destroy({
        where: {
          id: doctorId
        }
      })
        .catch(error => {
          res.status(500).send('Ошибка сервера');
    });
    res.redirect('/doctors')
}
const Search = async (req,res) =>{
    try {
        const searchQuery = req.query.q; // Получаем значение параметра q из строки запроса
        let doctors = await Doctor.findAll({
            where: { name: { [Op.like]: `%${searchQuery}%` } } 
    });
    
    if(!doctors.length){
        console.log('search') = await Doctor.findAll({
        where: { surname: { [Op.like]: `%${searchQuery}%` } } 
    })} else{
        doctors = await Doctor.findAll({
        where: { name: { [Op.like]: `%${searchQuery.split(' ')[0]}%` },
                 surname :{ [Op.like]: `%${searchQuery.split(' ')[1]}%` }} 
    })
    }
    
        res.render('../views/doctors.hbs', { doctors }); // Рендерим шаблон projects.hbs, передавая список проектов
      } catch (error) {
        console.error(error);
        res.sendStatus(500); // Отправляем ответ с кодом 500 Internal Server Error
    }
}





module.exports = {
    Add,
    Delete,
    Search
}