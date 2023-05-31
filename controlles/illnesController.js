const {Illnes, Patient, Doctor} = require('../modals')
const { Op } = require('sequelize');


const Delete = async (req,res) =>{
    const illnesId = req.params.id
    Illnes.destroy({
        where: {
          id: illnesId
        }
      })
        .catch(error => {
          res.status(500).send('Ошибка сервера');
    });
    res.redirect('/illness')
}
const Search = async (req,res) =>{
    try {
        const searchQuery = req.query.q; // Получаем значение параметра q из строки запроса
        let patient = await Patient.findOne({
            where: { name: { [Op.like]: `%${searchQuery}%` } } 
        });
    if(patient == null){
        patient = await Patient.findOne({
            where: { surname: { [Op.like]: `%${searchQuery}%` } } 
        });
    }
    const patId = patient.id
        let illness = await Illnes.findAll({
            where: { patientId: patId   } 
    });
    let finishIllness = []
    illness.map(async (element) =>{
        const patient = await Patient.findOne({where:{id:element.patientId}})
        const doctor =  await Doctor.findOne({where:{id:element.doctorId}})
        finishIllness.push( {
            id: element.id,
            patient:  `${patient.name} ${patient.surname}`,
            doctor: `${doctor.name} ${doctor.surname}`,
            dataOfVisit: element.dataOfVisit,
            disease: element.disease,
        })
    })
        res.render('../views/illness.hbs', { finishIllness }); // Рендерим шаблон projects.hbs, передавая список проектов
      } catch (error) {
        console.error(error);
        res.sendStatus(500); // Отправляем ответ с кодом 500 Internal Server Error
    }
}





module.exports = {
    Delete,
    Search
}