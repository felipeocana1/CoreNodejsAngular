const {conexion, runQuery} = require('../config/conexion');
const {Cliente} = require('../Models/cliente');

const validarRol= async(req, res, next)=>{
    let cliente;
    const id = req.body.id;
    
    console.log(id)

    await Cliente.findAll({
        raw: true,
        where:{
            id_cliente : id
        }
    }).then(res => cliente = res[0]);

    if(cliente.rol !== "ADMIN"){
        return res.status(401).json({
            ok:false,
            msg:'No eres admin'
        })
    }
    next();
}

const validarRolURL= async(req, res, next)=>{
    let cliente;
    const {id}=req.params.id;
    
    await Cliente.findAll({
        raw: true,
        where:{
            id_cliente : id
        }
    }).then(res => cliente = res[0]);

    if(cliente.rol !== "ADMIN"){
        return res.status(401).json({
            ok:false,
            msg:'No eres admin'
        })
    }
    next();
}

module.exports={

    validarRol,validarRolURL

}