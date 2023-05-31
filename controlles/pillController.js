const {Pill} = require('../modals')
const { Op } = require('sequelize');

const Add = async (req,res) =>{
    const {name,reason} = req.body
    const pills = await Pill.findAll()
    console.log(`${name}   ${reason} `)
    if(!name || !reason){
        res.status(400).send('Enter data')
        return;
    }
    try{
        const  pills = await Pill.create({name,reason})
    }
    catch(err){
        res.status(500).send('Error')
        return;
    }
    res.redirect('/pills')
}
const Delete = async (req,res) =>{
    const pillId = req.params.id
    Pill.destroy({
        where: {
          id: pillId
        }
      })
        .catch(error => {
          res.status(500).send('Ошибка сервера');
    });
    res.redirect('/pills')
}
const Search = async (req,res) =>{
    try {
        const searchQuery = req.query.q; // Получаем значение параметра q из строки запроса
        let pills = await Pill.findAll({
            where: { name: { [Op.like]: `%${searchQuery}%` } } 
    });
    
        res.render('../views/pills.hbs', { pills }); // Рендерим шаблон projects.hbs, передавая список проектов
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