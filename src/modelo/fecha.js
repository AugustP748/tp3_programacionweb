
// Defininimos fecha en el formato adecuado para comprar en la base de datos
const hoy = new Date(Date.now());
const fecha = hoy.toISOString().split("T")[0] + 'T03:00:00.000Z'

module.exports=fecha