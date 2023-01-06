const rutas = require('express').Router()
const { crearPlato, obtenerPlatoPorTemporada } = require('../Controllers/PlatoController');
const { validarJWT } = require('../midlewares/Validarjwt');


// agregar productos
rutas.post('/',[
    //validarJWT,
    // validarRol
],
crearPlato)

// agregar productos
rutas.get('/temporada/:id',[
    //validarJWT,
    // validarRol
],
obtenerPlatoPorTemporada)

module.exports= rutas;
