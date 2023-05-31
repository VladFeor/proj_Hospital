const {Patient} = require('../modals')
const { Op } = require('sequelize');

const Add = async (req,res) =>{
    const {name,surname,rank,gender,dataOfBirth,address,numberPhone} = req.body
    const patients = await Patient.findAll()

    console.log(`${name} ${surname} ${rank} ${gender} ${dataOfBirth} ${address} ${numberPhone}`)
    if(!name || !surname || !rank || !gender || !dataOfBirth || !address || !numberPhone){
        res.status(400).send('Enter data')
        return;
    }
    if( dataOfBirth > '2005-04-30' ){
        res.status(400).send('Too young person')
        return;
    }
    if( numberPhone.length != 9){
        res.status(400).send('Enter true number phone')
        return;
    }
    try{
        const patients = await Patient.create({name,surname,rank,gender,dataOfBirth,address,numberPhone})
    }
    catch(err){
        console.log(err)
        res.status(500).send('Error')
        return;
    }
    res.redirect('/patients')
}
const Delete = async (req,res) =>{
    const projectId = req.params.id
    Patient.destroy({
        where: {
          id: projectId
        }
      })
        .catch(error => {
          res.status(500).send('Ошибка сервера');
    });
    res.redirect('/patients')
}
const Search = async (req,res) =>{
    try {
        const searchQuery = req.query.q; // Получаем значение параметра q из строки запроса
        let patients = await Patient.findAll({
            where: { name: { [Op.like]: `%${searchQuery}%` } } 
        });
        if(patients.length == 0){
            patients = await Patient.findAll({
            where: { surname: { [Op.like]: `%${searchQuery}%` } } 
        })}
        if(patients.length == 0){
            patients = await Patient.findAll({
            where: { name: { [Op.like]: `%${searchQuery.split(' ')[0]}%` },
                    surname :{ [Op.like]: `%${searchQuery.split(' ')[1]}%` }} 
        })
        }
    
        res.render('../views/patients.hbs', { patients }); // Рендерим шаблон projects.hbs, передавая список проектов
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