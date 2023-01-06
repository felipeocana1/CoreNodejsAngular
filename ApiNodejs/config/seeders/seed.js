const {sequelize} = require('../conexion');
const {Temporada} = require('../../Models/Temporada')
const {Producto} = require('../../Models/producto')
const {Cliente} = require('../../Models/cliente')
const { HistoricoPrecio } = require('../../Models/historicoPrecio');
const { Plato } = require('../../Models/plato');
const{crearPlato} = require('./funcionesAuxiliares')
require('../Relations');


//Clientes
const clientes = [
    {nombre:"Felipe",passwordcli:"123456",mail:"Felipe@mail.com",rol:"ADMIN"},
    {nombre:"Juan",passwordcli:"123456",mail:"juan@mail.com",rol:"USER"}
]

//Productos
const productos =[
    //prod 1
    {nombre:"papa",descripcion:"tuberculo"},
    //prod 2
    {nombre:"tomate",descripcion:"vegetal"},
    //prod 3
    {nombre:"camaron",descripcion:"marisco"},
    //prod 4
    {nombre:"pescado",descripcion:"marisco"},
    //prod 5
    {nombre:"cebolla",descripcion:"vegetal"},
    //prod 6
    {nombre:"perejil",descripcion:"hortaliza"},
    //prod 7
    {nombre:"limon",descripcion:"fruta"},
    //prod 8
    {nombre:"carne de res",descripcion:"carnes"},

]

//Temporada
const temporadas = [
    {nombre:"Todo el año",mesInicio:1,diaInicio:1,mesFin:12,diaFin:31},
    {nombre:"temporada alta mariscos",mesInicio:8,diaInicio:1,mesFin:10,diaFin:31},
    {nombre:"temporada alta vegetales",mesInicio:10,diaInicio:1,mesFin:12,diaFin:31}
]

//historicos de precios
const historicosPrecio = [
    //Temporada 1
    {IdTemporada:1,IdProducto:1,precio:1.50},
    {IdTemporada:1,IdProducto:2,precio:1.30},
    {IdTemporada:1,IdProducto:3,precio:1.50},
    {IdTemporada:1,IdProducto:4,precio:1.60},
    {IdTemporada:1,IdProducto:5,precio:1.10},
    {IdTemporada:1,IdProducto:6,precio:0.50},
    {IdTemporada:1,IdProducto:7,precio:0.90},
    {IdTemporada:1,IdProducto:8,precio:2.50},
    //Temporada 2
    {IdTemporada:2,IdProducto:1,precio:1.50},
    {IdTemporada:2,IdProducto:2,precio:1.10},
    {IdTemporada:2,IdProducto:3,precio:0.50},
    {IdTemporada:2,IdProducto:4,precio:0.60},
    {IdTemporada:2,IdProducto:5,precio:1.12},
    {IdTemporada:2,IdProducto:6,precio:0.75},
    {IdTemporada:2,IdProducto:7,precio:0.80},
    {IdTemporada:2,IdProducto:8,precio:3},
    //Temporada 3
    {IdTemporada:3,IdProducto:1,precio:1.80},
    {IdTemporada:3,IdProducto:2,precio:0.60},
    {IdTemporada:3,IdProducto:3,precio:1.10},
    {IdTemporada:3,IdProducto:4,precio:1},
    {IdTemporada:3,IdProducto:5,precio:0.40},
    {IdTemporada:3,IdProducto:6,precio:0.30},
    {IdTemporada:3,IdProducto:7,precio:0.80},
    {IdTemporada:3,IdProducto:8,precio:1.50},
]


//platos
// const platos = [
//     //plato 1
//     {nombre:"ceviche camaron",descripcion:"Un delicioso ceviche de camaron","productos":[
//         {IdPlato:1,IdProducto:2},
//         {IdPlato:1,IdProducto:4},   
//     ]},
//     //plato 2
//     // {nombre:"pure de papa con carne",descripcion:"Nuestra mejor carne de res con un delicioso pure de papa","productos":[
//     //     {IdPlato:2,IdProducto:1},   
//     //     {IdPlato:2,IdProducto:8}
//     // ]},    
// ]



setTimeout(async () => {
    sequelize.sync({force:false});
    await clientes.forEach(cliente => Cliente.create(cliente));
    await productos.forEach(producto => Producto.create(producto));
    await temporadas.forEach(temporada => Temporada.create(temporada));
    await historicosPrecio.forEach(historicoPrecio => HistoricoPrecio.create(historicoPrecio));
    // await platos.forEach(plato => crearPlato(plato.nombre,plato.descripcion,plato.productos));
}, 400);