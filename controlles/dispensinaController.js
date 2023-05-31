const {Dispensina,Illnes,Patient} = require('../modals')
const { Op } = require('sequelize');

const Add = async (req,res) =>{
    const {illnesId,doctorId,pillId,dataOfDispansina} = req.body
    const dataNow = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit',year: 'numeric',hour: 'numeric',minute: 'numeric',hour12: false,}).replace(',', '')
    if(dataOfDispansina > dataNow){
        res.status(400).send('Enter true data')
        return
    }
    if(!illnesId || !doctorId || !pillId || !dataOfDispansina){
        res.status(400).send('Enter data')
        return;
    }
    try{
        const  despensina = await Dispensina.create({illnesId,doctorId,pillId,dataOfDispansina})
    }
    catch(err){
        res.status(500).send('Error')
        return;
    }
    res.redirect('/dispensinas')
}
const Delete = async (req,res) =>{
    const dispensinaId = req.params.id
    Dispensina.destroy({
        where: {
          id: dispensinaId
        }
      })
        .catch(error => {
          res.status(500).send('Ошибка сервера');
    });
    res.redirect('/dispensinas')
}
// const Search = async (req,res) =>{
//     try {
//         const searchQuery = req.query.q; // Получаем значение параметра q из строки запроса
//         let patient = await Patient.findAll({
//             where: { name: { [Op.like]: `%${searchQuery}%` } } 
//         });

//         patient.map(async (element) =>{
//             const befoteIllnes = await Illnes.findOne({where:{id:element.illnesId}})
//             const illness = await Patient.findOne({where:{id:befoteIllnes.patientId}})
//             const mainDoctor =  await Doctor.findOne({where:{id:befoteIllnes.doctorId}})
//             const doctor =  await Doctor.findOne({where:{id:element.doctorId}})
//             const pill =  await Pill.findOne({where:{id:element.pillId}})
//             finalDis.push( {
//                 id: element.id,
//                 illness:  `${illness.name} ${illness.surname}`,
//                 mainDoctor: `${mainDoctor.name} ${mainDoctor.surname}`,
//                 doctor: `${doctor.name} ${doctor.surname}`, 
//                 pill: pill.name, 
//                 dataOfDispansina: element.dataOfDispansina,
//             })
//         })


//         res.render('../views/doctors.hbs'); // Рендерим шаблон projects.hbs, передавая список проектов
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