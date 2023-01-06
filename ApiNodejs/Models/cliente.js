const {sequelize,Sequelize} = require('../config/conexion')

const Cliente = sequelize.define('clientes', {
    id_cliente: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    passwordcli: Sequelize.STRING,
    rol:{ 
        type:Sequelize.ENUM,
        values:["USER","ADMIN"],
        defaultValue: "USER"
    },
    mail: Sequelize.STRING,
},{
    tableName: 'tb_cliente',
    timestamps: false,
})



module.exports = {Cliente}