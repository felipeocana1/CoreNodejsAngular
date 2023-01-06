const { Producto } = require('../Models/producto');
const { HistoricoPrecio } = require('../Models/historicoPrecio');
const { Temporada } = require('../Models/Temporada');
const { Op } = require('../config/conexion');
const { actualizarPrecioPlatoTemporada } = require('./precioPlatoTemporadaControler');



const crearProducto = async (req, res) => {

    const { nombre, descripcion } = req.body.producto
    const { precio } = req.body.temporada
    let IdProducto;

    await Producto.create({
        nombre,
        descripcion
    }, {
        raw: true,
    }).then(prod => {
        IdProducto = prod.id_producto;
        return res.status(200).json({
            ok: true,
            msg: "se creo Correctamente",
            prod
        })
    });


    const temporadasId = [];


    //Trae todos los ids de todas las temporadas y los guarda en un array
    const temporadas = await Temporada.findAll();
    temporadas.every(temporada => temporadasId.push(temporada.id_temporada));

    //Crea la relacion del nuevo producto por cada temporada
    temporadasId.forEach(id => {
        HistoricoPrecio.create({
            IdTemporada: id, IdProducto, precio
        });
    })


}



const obtenerProductos = async (req, res) => {
    await Producto.findAll({ raw: true }).then(prod => {
        return res.status(200).json({
            ok: true,
            productos: prod
        })
    });
}

const obtenerProductoById = async (req, res) => {
    const { id } = req.params
    await Producto.findByPk(id, { raw: true }).then(prod => {
        return res.status(200).json({
            ok: true,
            productos: prod
        })
    });
}

const obtenerProductosPorTemporada = async (req, res) => {
    const { id } = req.params
    let productosConPrecio = []
    const producto = await Producto.findAll({ raw: true });

    await producto.forEach(async produ => {
        let preci;

        await HistoricoPrecio.findOne({
            where: {
                [Op.and]: [{ IdProducto: produ.id_producto }, { IdTemporada: id }]
            },
            raw: true,
            attributes: ['precio']
        }).then(respuesta => {
            preci = respuesta.precio;
        })
        productosConPrecio.push({ Producto: produ, precio: preci });
    })

    setTimeout(() => {
        return res.status(200).json({
            ok: true,
            productos: productosConPrecio
        })
    }, 100)
}

const obtenerProductoPorIdYTemporada = async (req, res) => {
    const { id } = req.params
    const { IdTemporada } = req.body.temporada

    let producto;
    let precio;

    await Producto.findByPk(id, { raw: true }).then(prod => {
        producto = prod;
    });

    await HistoricoPrecio.findOne({
        where: {
            [Op.and]: [{ IdProducto: id }, { IdTemporada }]
        },
        raw: true,
        attributes: ['precio']
    }).then(pre => precio = pre.precio)


    return res.status(200).json({
        ok: true,
        producto: producto,
        precio
    })
}



const eliminarProducto = async (req, res) => {
    const { id } = req.params

    await Producto.destroy({
        raw: true,
        where: {
            id_producto: id
        }
    }).then(prod => {
        return res.status(200).json({
            ok: true,
            msg: "Se eliminó correctamnete"
        })
    });
}



const acutualizarProducto = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body.producto
    const { precio, IdTemporada } = req.body.temporada

    await Producto.update({
        nombre,
        descripcion
    }, {
        raw: true,
        where: {
            id_producto: id
        }
    }).then(() => {
        return res.status(200).json({
            ok: true,
            msg: "se actualizó correctamente"
        })
    });

    await actualizarPrecioPlatoTemporada(IdTemporada, id, precio);

    await HistoricoPrecio.update({
        precio
    }, {
        where: {
            [Op.and]: [{ IdProducto: id }, { IdTemporada }]
        }
    })

}


const reporteDePrecios = async (req, res) => {
    const productosId = [];
    const reporte = [];
    //traemos todos los productos
    const productos = await Producto.findAll();
    productos.every(producto => productosId.push({
        "IdProd": producto.id_producto,
        "Nombre": producto.nombre

    }));

        await productosId.forEach(async (Prod) => {

            const temporadasId = [];
            let temporadaPreciosDiferencia = [];
            let respuesta;
            let precioBase;
    
    
            //a la respuesta agrego el precio base
            await HistoricoPrecio.findOne({
                where: {
                    [Op.and]: [{ IdProducto: Prod.IdProd }, { IdTemporada: 3 }]
                },
                raw: true,
                attributes: ['precio']
            }).then((respuestPrecio) => {
    
                precioBase = respuestPrecio.precio
                respuesta = {
                    "Precio Base": respuestPrecio.precio
                }
            })
    
            //Trae todos los ids de todas las temporadas y los guarda en un array menos la temporada por default
            const temporadas = await Temporada.findAll({ raw: true });
            await temporadas.forEach(temporada => {
                if (temporada.id_temporada != 3) {
                    temporadasId.push(temporada.id_temporada)
                }
            });
    
            //Agregamnos a la respuesta todas las diferencias de precios en funcion del precio base
            await temporadasId.forEach(async (temporada) => {
                const precio = await HistoricoPrecio.findOne({
                    where: {
                        [Op.and]: [{ IdProducto: Prod.IdProd }, { IdTemporada: temporada }]
                    },
                    raw: true,
                    attributes: ['precio']
                });
                const dieferenciaPrecios = precioBase - precio.precio
                
                const producto = await Temporada.findOne({
                    where: {
                        id_temporada: temporada
                    },
                    attributes: ["nombre"],
                    raw: true
                })
    
                await temporadaPreciosDiferencia.push({
                    "Nombre Temporada": producto.nombre,
                    "Diferencia": dieferenciaPrecios
                })
            })
            respuesta = {
                ...respuesta,
                temporadaPreciosDiferencia
            }
            await reporte.push({
                "Nombre": Prod.Nombre,
                "Precios": respuesta
        
            });
        })



    setTimeout(() => {
        return res.status(200).json({
            ok: "hola",
            reporte
        })
    },30000)
}


const funcionAux = async (idProducto) => {
    const temporadasId = [];
    let temporadaPreciosDiferencia = [];
    let respuesta;
    let precioBase;



    //a la respuesta agrego el precio base
    await HistoricoPrecio.findOne({
        where: {
            [Op.and]: [{ IdProducto: idProducto }, { IdTemporada: 3 }]
        },
        raw: true,
        attributes: ['precio']
    }).then((respuestPrecio) => {

        precioBase = respuestPrecio.precio
        respuesta = {
            "Precio Base": respuestPrecio.precio
        }
    })

    //Trae todos los ids de todas las temporadas y los guarda en un array menos la temporada por default
    const temporadas = await Temporada.findAll({ raw: true });
    await temporadas.forEach(temporada => {
        if (temporada.id_temporada != 3) {
            temporadasId.push(temporada.id_temporada)
        }
    });

    //Agregamnos a la respuesta todas las diferencias de precios en funcion del precio base
    await temporadasId.forEach(async (temporada) => {
        await HistoricoPrecio.findOne({
            where: {
                [Op.and]: [{ IdProducto: idProducto }, { IdTemporada: temporada }]
            },
            raw: true,
            attributes: ['precio']
        }).then(async (respuestPrecio) => {
            const dieferenciaPrecios = precioBase - respuestPrecio.precio
            setTimeout(() => {
                Temporada.findOne({
                    where: {
                        id_temporada: temporada
                    },
                    attributes: ["nombre"],
                    raw: true
                }).then(respTemp => {

                    temporadaPreciosDiferencia.push({
                        "Nombre Temporada": respTemp.nombre,
                        "Dieferencia": dieferenciaPrecios
                    })
                })
            }, 100);
            respuesta = {
                ...respuesta,
                temporadaPreciosDiferencia
            }
        })
    })


    setTimeout(() => {
        console.log(respuesta)
        return respuesta;
    }, 100);



}

module.exports = {
    crearProducto, obtenerProductos, eliminarProducto, acutualizarProducto, obtenerProductoById, obtenerProductoPorIdYTemporada, obtenerProductosPorTemporada,
    reporteDePrecios
}