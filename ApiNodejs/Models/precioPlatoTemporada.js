const {sequelize,Sequelize} = require('../config/conexion')
const { Plato } = require('./plato')
const { Temporada } = require('./Temporada')

const PrecioPlatoTemporada = sequelize.define('precioPlatoTemporada', {
    IdPlato:{
        type: Sequelize.INTEGER,
        references: {
            model: Plato, // 'Actors' would also work
            key: 'id_plato'
        }
    },
    IdTemporada:{
        type: Sequelize.INTEGER,
        references: {
            model: Temporada, // 'Actors' would also work
            key: 'id_temporada'
        }
    },
    precio:{
        type:Sequelize.FLOAT,
        defaultValue:0
    } 
},{
    tableName: 'PrecioPlatoTemporada',
    timestamps: false,
})


module.exports = {PrecioPlatoTemporada}