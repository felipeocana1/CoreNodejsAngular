const {sequelize,Sequelize} = require('../config/conexion')

const Plato = sequelize.define('plato', {
    id_plato: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
},{
    tableName: 'Plato',
    timestamps: false,
})


module.exports = {Plato}