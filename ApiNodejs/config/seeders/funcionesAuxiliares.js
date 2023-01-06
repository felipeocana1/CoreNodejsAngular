const {Plato} = require('../../Models/plato');
const {productosPlato} = require('../../Models/productosPlato');
const {Temporada} = require('../../Models/Temporada');
const {HistoricoPrecio} = require('../../Models/historicoPrecio');
const {PrecioPlatoTemporada} = require('../../Models/precioPlatoTemporada');
const{Op}= require('../conexion')





const crearPlato=async(nombre, descripcion,productos)=>{

    let platoId;
    await Plato.create({
        nombre,
        descripcion
    },{
        raw:true
    }).then((plato)=>{
        platoId = plato.id_plato
    })

    productos.forEach(element => {
        element.IdPlato = platoId;
        const {IdProducto,IdPlato} = element;
        productosPlato.create({IdProducto,IdPlato});
    });

    await establecerPrecios(platoId);

}


const establecerPrecios = async(platoId)=>{
    const temporadasId=[];
    const productosId=[];

    
    //Trae todos los ids de todas las temporadas y los guarda en un array
    const temporadas = await Temporada.findAll();
    temporadas.every(temporada => temporadasId.push(temporada.id_temporada));

    //trae los ids de los productos que contenga el plato y los guarda en un array
    const productos = await productosPlato.findAll({
        where:{
            IdPlato:platoId
        }
    });
    productos.every(producto => productosId.push(producto.IdProducto));


    temporadasId.forEach(async (temporadaId)=>{
        let precio = 0;
        products = await HistoricoPrecio.findAll({
            attributes: ["precio"],
            raw:true,
            where:{
                [Op.and]:[{IdProducto:productosId},{IdTemporada:temporadaId}]
            }
        })
        products.forEach(pro=>{
            precio=precio+pro.precio
        })
        ppt=await PrecioPlatoTemporada.create({
            IdPlato:platoId,
            IdTemporada:temporadaId,
            precio
        })
    })
}



module.exports = {
    crearPlato
}