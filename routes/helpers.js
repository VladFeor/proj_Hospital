const handlebars = require('handlebars');
const {Patient, Doctor,Visit } = require('../modals')

handlebars.registerHelper('formatDate', function(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');
});
handlebars.registerHelper('formatDateTime', function(date) {
  return new Date(date).toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).replace(',', '');
});
handlebars.registerHelper('lookup', async function(id) {
  const patient = await Patient.findOne({where:{id:32}})
  const name = patient.name
  console.log(name)
  return name
});