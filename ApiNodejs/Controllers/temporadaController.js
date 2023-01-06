const { HistoricoPrecio } = require('../Models/historicoPrecio');
const { Plato } = require('../Models/plato');
const {Temporada} = require('../Models/Temporada');
const { establecerPreciosNuevaTemporada } = require('./precioPlatoTemporadaControler');


const crearTemporada=async(req,res)=>{
    const {nombre,mesInicio,diaInicio,mesFin,diaFin} = req.body.Temporada;
    let IdTemporada;

    await Temporada.create({
        nombre,
        mesInicio,
        diaInicio,
        mesFin,
        diaFin
    },{
        raw: true,
    }).then((temp)=>{
        IdTemporada = temp.id_temporada;
    });

    const temporadas = await HistoricoPrecio.findAll({
        where:{
            IdTemporada:1
        },
        raw:true,
        attributes:['IdProducto','precio']
    });

    temporadas.forEach(hp=>{
        HistoricoPrecio.create({
            IdProducto:hp.IdProducto,
            IdTemporada,
            precio:hp.precio
        })
    })

    const platos=await Plato.findAll({raw:true,attributes:['id_plato']});
    await platos.forEach(async plato=>{
        await establecerPreciosNuevaTemporada(plato.id_plato,IdTemporada);
    })


    setTimeout(() => {
        return res.status(200).json({
            ok:true,
            msg: "se creo Correctamente",
        })
    }, 200);
    

}

const obtenerTemporadas=async(req,res)=>{

    await Temporada.findAll({
        raw:true
    }).then((temporadas)=>{
        return res.status(200).json({
            temporadas
        })
    })

}


module.exports ={crearTemporada,obtenerTemporadas}