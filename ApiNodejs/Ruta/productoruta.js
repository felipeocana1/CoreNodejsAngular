const rutas = require('express').Router()
const { crearProducto, obtenerProductos, eliminarProducto, acutualizarProducto, obtenerProductoById, agregarPrecioPorTemporada, obtenerProductoPorIdYTemporada, obtenerProductosPorTemporada, reporteDePrecios } = require('../Controllers/productoController');
const { validarJWT } = require('../midlewares/Validarjwt');
const { validarRol, validarRolURL } = require('../midlewares/ValidarRol');


//core
rutas.post('/core/reporte',[
    //validarJWT,
    // validarRolURL
],
reporteDePrecios)

// agregar productos
rutas.post('/',[
    //validarJWT,
    // validarRol
],
crearProducto)


// agregar productos
rutas.post('/:id',[
    //validarJWT,
    // validarRol
],
obtenerProductoPorIdYTemporada)

//get productos
rutas.get('/',[
    //validarJWT,
    // validarRolURL
],
obtenerProductos)

//get product by id
rutas.get('/:id',[
    //validarJWT,
    // validarRolURL
],
obtenerProductoById)

//get product by id de temporada
rutas.get('/temporada/:id',[
    //validarJWT,
    // validarRolURL
],
obtenerProductosPorTemporada)

//delete producto
rutas.delete('/:id',[
    //validarJWT,
    // validarRol
],
eliminarProducto)

// modificar
rutas.put('/:id',[
    //validarJWT,
    // validarRol
],
acutualizarProducto)




module.exports= rutas;