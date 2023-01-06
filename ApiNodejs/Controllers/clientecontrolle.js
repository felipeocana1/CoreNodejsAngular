const { generarJWT } = require('../Helpers/jwt');
const {Cliente} = require('../Models/cliente');

const obtenercliente = async(req, res)=>{
    await Cliente.findAll({raw: true}).then(clientes => {
        return res.status(200).json({
            ok:true,
            clientes
        })
    });
}

const eliminarcliente = async(req, res)=>{

    await Cliente.destroy({
        raw: true,
        where:{
            id_cliente : req.params.id
        }
    }).then(() => {
        return res.status(200).json({
            ok:true,
            msg: "se elimino correctamente"
        })
    });
}

const modificarcliente = async (req, res)=>{
    const{nombre, mail}= req.body.cliente

    await Cliente.update({
        nombre,
        mail
    },{
        raw: true,
        where:{
            id_cliente : req.params.id
        }
    }).then(() => {
        return res.status(200).json({
            ok:true,
            msg: "se actualizó correctamente"
        })
    });
}

const agregarcliente = async(req, res)=>{
    let clienteAux;
    const{nombre, mail, passwordcli,rol} = req.body
    
    await Cliente.create({
        nombre,
        mail,
        passwordcli,
        rol
    },{
        raw: true,
    }).then(cliente => clienteAux=cliente.dataValues);
    
    const token =await generarJWT(clienteAux.id_cliente)
    res.json({
        status:'cliente agragado', 
        token
    })
}

const obtenerRol = async (req, res)=>{
    
    const{id}=req.params

    await Cliente.findByPk(id).then((result) => {
        return res.status(200).json({
            ok:true,
            rol: result.dataValues.rol
        })
    });
}

module.exports ={obtenercliente, eliminarcliente, modificarcliente, agregarcliente,obtenerRol}