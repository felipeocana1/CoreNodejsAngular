const {sequelize,Sequelize} = require('../config/conexion')
const {Producto} = require('./producto');
const { Plato } = require('./plato');

const productosPlato = sequelize.define('productosPlato', {
    IdProducto:{
        type: Sequelize.INTEGER,
        references: {
            model: Producto, // 'Actors' would also work
            key: 'id_producto'
        }
    },
    IdPlato:{
        type: Sequelize.INTEGER,
        references: {
            model: Plato, // 'Actors' would also work
            key: 'id_plato'
        }
    }
},{
    tableName: 'productosPlato',
    timestamps: false,
})


module.exports = {productosPlato}