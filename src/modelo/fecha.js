
// Defininimos fecha en el formato adecuado para comprar en la base de datos
//const hoy = new Date(Date.now());
const hoy = new Date(new Date().toLocaleString('en', {timeZone: 'America/Buenos_aires'}))
//const hoy = new Date('2022-12-02');
const fecha = hoy.toISOString().split("T")[0] + 'T03:00:00.000Z'

/*
let date = new Date(Date.now());

let ArgDate = date.toLocaleString('en-GB', {timeZone: "America/Buenos_aires"});
console.log(ArgDate);
let fecha = Date.parse(ArgDate);
console.log('Date in USA: ' + typeof fecha);
*/
module.exports=fecha