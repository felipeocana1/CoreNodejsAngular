//require('./config/conexion');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {sequelize} = require('./config/conexion');
const port = (process.env.port || 3000 );
require('./config/Relations');


//express
const app = express();
app.use(cors());


//admitir
app.use(express.json())

//config
app.set('port',port)



//rutas
app.use('/api/clientes',require('./Ruta/clienterutas'))
app.use('/api/login',require('./Ruta/authruta'));
app.use('/api/producto',require('./Ruta/productoruta'));
app.use('/api/temporada',require('./Ruta/temporadaRuta'));
app.use('/api/plato',require('./Ruta/platoRuta'));



//iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('error al inciar servidor: '+error)
    }
    else{
        console.log('servidor iniciado en el puerto: '+port)
        sequelize.authenticate();
    }
})

