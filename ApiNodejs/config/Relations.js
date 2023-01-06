const {Producto} = require('../Models/producto');
const {Temporada} = require('../Models/Temporada');
const {Plato} = require('../Models/plato');
const {productosPlato} = require('../Models/productosPlato');
const {HistoricoPrecio} = require('../Models/historicoPrecio');
const { PrecioPlatoTemporada } = require('../Models/precioPlatoTemporada');


//Historico Precio
Temporada.belongsToMany(Producto,{ through: HistoricoPrecio,foreignKey: "IdTemporada"});
Producto.belongsToMany(Temporada,{ through: HistoricoPrecio,foreignKey: "IdProducto",constraints: false });

//Productos plato
Plato.belongsToMany(Producto,{ through: productosPlato,foreignKey: "IdPlato",constraints: false});
Producto.belongsToMany(Plato,{ through: productosPlato,foreignKey: "IdProducto",constraints: false });

//precio Plato Temporada
Plato.belongsToMany(Temporada,{ through: PrecioPlatoTemporada,foreignKey: "IdPlato",constraints: false});
Temporada.belongsToMany(Plato,{ through: PrecioPlatoTemporada,foreignKey: "IdTemporada",constraints: false });