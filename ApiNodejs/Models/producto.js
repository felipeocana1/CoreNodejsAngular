const {sequelize,Sequelize} = require('../config/conexion')

const Producto = sequelize.define('producto', {
    id_producto: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
},{
    tableName: 'tb_producto',
    timestamps: false,
})


module.exports = {Producto}