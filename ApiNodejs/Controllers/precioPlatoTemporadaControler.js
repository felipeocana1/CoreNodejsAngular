const { Temporada } = require('../Models/Temporada');
const { HistoricoPrecio } = require('../Models/historicoPrecio');
const { PrecioPlatoTemporada } = require('../Models/precioPlatoTemporada');
const { productosPlato } = require('../Models/productosPlato');
const { Op } = require('../config/conexion')


const actualizarPrecioPlatoTemporada = async (IdTemporada, IdProducto, precio) => {
    const platosIds = [];
    let precioAnterior;

    //Obtengo el precio anteriro del producto en la temporada indicada
    await HistoricoPrecio.findOne({
        where: {
            [Op.and]: [{ IdProducto }, { IdTemporada }]
        },
        attributes: ["precio"],
        raw: true
    }).then((res) => precioAnterior = res.precio)

    //Obtiene todos los platos(solo ids) que tengan el producto que se esta actualizando y los guarda en el array previamente definido
    const platos = await productosPlato.findAll({
        where: {
            IdProducto
        },
        attributes: ["IdPlato"],
        raw: true
    });
    platos.forEach(plato => {
        platosIds.push(plato.IdPlato);
    });


    platosIds.forEach(async (plato) => {
        let nuevoPrecio;

        await PrecioPlatoTemporada.findOne({
            where: {
                [Op.and]: [{ IdPlato: plato }, { IdTemporada }]
            },
            raw: true,
            attributes: ['precio']
        }).then(res => nuevoPrecio = res.precio);

        nuevoPrecio = (nuevoPrecio - precioAnterior) + precio;

        await PrecioPlatoTemporada.update({ precio: nuevoPrecio }, {
            where: {
                [Op.and]: [{ IdPlato: plato }, { IdTemporada }]
            }
        });

    })

}


const establecerPrecios = async (platoId) => {
    const temporadasId = [];
    const productosId = [];
    //Trae todos los ids de todas las temporadas y los guarda en un array
    const temporadas = await Temporada.findAll();
    temporadas.every(temporada => temporadasId.push(temporada.id_temporada));
    //trae los ids de los productos que contenga el plato y los puarda en un array
    const productos = await productosPlato.findAll({
        where: {
            IdPlato: platoId
        }
    });

    productos.every(producto => productosId.push(producto.IdProducto));
    temporadasId.forEach(async (temporadaid) => {
        let precio = 0;
        products = await HistoricoPrecio.findAll({
            attributes: ["precio"],
            raw: true,
            where: {
                [Op.and]: [{ IdProducto: productosId }, { IdTemporada: temporadaid }]
            }
        })

        await products.forEach(pro => {
            precio = precio + pro.precio
        }
        )
        ppt = await PrecioPlatoTemporada.create({
            IdPlato: platoId,
            IdTemporada: temporadaid,
            precio
        })
    })
}

const establecerPreciosNuevaTemporada = async (platoId, IdTemporada) => {
    const productosId = [];



    //trae los ids de los productos que contenga el plato y los guarda en un array
    const productos = await productosPlato.findAll({
        where: {
            IdPlato: platoId
        }
    });
    productos.every(producto => productosId.push(producto.IdProducto));


    let precio = 0;
    products = await HistoricoPrecio.findAll({
        attributes: ["precio"],
        raw: true,
        where: {
            [Op.and]: [{ IdProducto: productosId }, { IdTemporada }]
        }
    })
    await products.forEach(pro => {
        precio = precio + pro.precio
    })
    ppt = await PrecioPlatoTemporada.create({
        IdPlato: platoId,
        IdTemporada,
        precio
    })
}

module.exports = { actualizarPrecioPlatoTemporada, establecerPreciosNuevaTemporada, establecerPrecios }