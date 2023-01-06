const {Plato} = require('../Models/plato');
const { PrecioPlatoTemporada } = require('../Models/precioPlatoTemporada');
const {productosPlato} = require('../Models/productosPlato');
const { establecerPrecios } = require('./precioPlatoTemporadaControler');
const{Op}= require('../config/conexion');






const crearPlato=async(req,res)=>{

    const{nombre, descripcion,productos} = req.body
    let platoId;
    await Plato.create({
        nombre,
        descripcion
    },{
        raw:true
    }).then((plato)=>{
        platoId = plato.id_plato
    })

    await productos.forEach(async element => {
        element.IdPlato = platoId;
        const {IdProducto,IdPlato} = element;
        await productosPlato.create({IdProducto,IdPlato});
    });

    setTimeout(async ()=>{
        await establecerPrecios(platoId);
        return res.status(200).json({
            ok:true,
        })
    },150)

}

const obtenerPlatoPorTemporada=async(req,res)=>{
    const {id} = req.params
    let platosConPrecio=[];

    const platos = await Plato.findAll({raw:true});

    await platos.forEach(async plato=>{
        let precio;

        await PrecioPlatoTemporada.findOne({
            where:{
                [Op.and]:[{IdPlato:plato.id_plato},{IdTemporada:id}]
            },
            raw:true,
            attributes:['precio']
        }).then(respueta=>{
            precio = respueta.precio;
        })
        platosConPrecio.push({Plato:plato,precio});
    })

    setTimeout(()=>{
        return res.status(200).json({
            ok:true,
            platos:platosConPrecio
        })
    },100)

}



module.exports = {
    crearPlato,
    obtenerPlatoPorTemporada
}