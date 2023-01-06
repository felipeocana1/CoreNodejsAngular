const {sequelize,Sequelize} = require('../config/conexion')

const Temporada = sequelize.define('temporada', {
    id_temporada: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    mesInicio: Sequelize.INTEGER,
    diaInicio: Sequelize.INTEGER,
    mesFin: Sequelize.INTEGER,
    diaFin: Sequelize.INTEGER,

},{
    tableName: 'tb_temporada',
    timestamps: false,
})


module.exports = {Temporada}