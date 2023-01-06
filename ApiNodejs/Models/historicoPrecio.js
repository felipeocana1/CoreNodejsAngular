const {sequelize,Sequelize} = require('../config/conexion')
const {Producto} = require('./producto');
const { Temporada } = require('./Temporada');

const HistoricoPrecio = sequelize.define('historicoPrecio', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    IdProducto:{
        type: Sequelize.INTEGER,
        references: {
            model: Producto, // 'Actors' would also work
            key: 'id_producto'
        }
    },
    IdTemporada:{
        type: Sequelize.INTEGER,
        defaultValue:1,
        references: {
            model: Temporada, // 'Actors' would also work
            key: 'id_temporada'
        }
    },
    precio:Sequelize.FLOAT
},{
    tableName: 'PrecioHistorico',
    timestamps: false,
})


module.exports = {HistoricoPrecio}