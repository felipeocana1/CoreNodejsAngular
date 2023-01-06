const rutas = require('express').Router()
const { crearTemporada,obtenerTemporadas } = require('../Controllers/temporadaController');
const { validarJWT } = require('../midlewares/Validarjwt');
const { validarRol, validarRolURL } = require('../midlewares/ValidarRol');



// agregar Temporadas
rutas.post('/',[
    //validarJWT,
    // validarRol
],
crearTemporada)

rutas.get('/',[
    //validarJWT,
    // validarRol
],
obtenerTemporadas)


module.exports= rutas;