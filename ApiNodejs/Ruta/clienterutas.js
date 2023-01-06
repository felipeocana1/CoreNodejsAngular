const rutas = require('express').Router()
const { validarJWT } = require('../midlewares/Validarjwt');
const {obtenercliente, eliminarcliente, modificarcliente, agregarcliente, obtenerRol}= require('../Controllers/clientecontrolle');
const { validarRol } = require('../midlewares/ValidarRol');



//----asignamos todas la rutas---------


//-----------------------------------------------
//get equipos
rutas.get('/',[
    validarJWT
],
obtenercliente
)

//-------------------------------------
//delete equipos
rutas.delete('/:id',[
    validarJWT,
    validarRol
],
eliminarcliente)

//-------------------------------------
// agregar equipos
rutas.post('/',[

],
agregarcliente)

//-----------------------------------------------
// modificar
rutas.put('/:id',[
    validarJWT,
    validarRol
],
modificarcliente)

//rol
rutas.get('/:id',[
    validarJWT
],
obtenerRol
)

module.exports= rutas;

//module.exports= router;