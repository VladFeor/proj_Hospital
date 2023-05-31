const {Visit,Illnes} = require('../modals')
const { Op } = require('sequelize');

const Add = async (req,res) =>{
    const {patientId,doctorId,dataOfVisit,disease,isIllnes} = req.body
    const dataNow = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit',year: 'numeric',hour: 'numeric',minute: 'numeric',hour12: false,}).replace(',', '')
    const isCompleted = dataOfVisit < dataNow ? true : false
    
    // console.log(`${patientId} ${doctorId} ${dataOfVisit} ${disease} ${isCompleted}`)
    if(!patientId || !doctorId || !dataOfVisit || !disease){
        res.status(400).send('Enter data')
        return;
    }
    try{
        const  visits = await Visit.create({patientId,doctorId,dataOfVisit,disease,isCompleted})
        if(isIllnes == 'on' && isCompleted){
        const illness = await Illnes.create({patientId,doctorId,disease})
        }
    }
    catch(err){
        res.status(500).send('Error')
        return;
    }
    res.redirect('/visiting')
}
const Delete = async (req,res) =>{
    const visitId = req.params.id
    Visit.destroy({
        where: {
          id: visitId
        }
      })
        .catch(error => {
          res.status(500).send('Ошибка сервера');
    });
    res.redirect('/visiting')
}
// const Search = async (req,res) =>{
//     try {
//         const searchQuery = req.query.q; // Получаем значение параметра q из строки запроса
//         let pills = await Pill.findAll({
//             where: { name: { [Op.like]: `%${searchQuery}%` } } 
//     });
    
//         res.render('../views/pills.hbs', { pills }); // Рендерим шаблон projects.hbs, передавая список проектов
//       } catch (error) {
//         console.error(error);
//         res.sendStatus(500); // Отправляем ответ с кодом 500 Internal Server Error
//     }
// }





module.exports = {
    Add,
    Delete,
    // Search
}