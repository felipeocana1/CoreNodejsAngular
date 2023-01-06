const { generarJWT } = require('../Helpers/jwt');
const {Cliente} = require('../Models/cliente');

const login =  async(req, res)=>{
    
    try {
        let cliente;
        const {mail, passwordcli}=req.body;

        await Cliente.findAll({
            raw: true,
            where:{
                mail
            }
        }).then(res => cliente = res[0]);

            
            
            //verificar mail
            if(!cliente){
                return res.status(404).json({
                    ok:false,
                    msg:'no se encontro un usuario con dicho correo'
                })
            }
            
            
            //verificar contra
            const validPassword = (passwordcli === cliente.passwordcli)
            if(!validPassword){
                return res.status(404).json({
                    ok:false,
                    msg:'contraseña no valida'
                })
            }
            
            //generar token
            const token =await generarJWT(cliente.id_cliente)
            res.json({
                ok:true,
                token,
                cliente
            })

    } catch (error) {

        console.log(error);

        res.status(500).json({

            ok:false,

            msg:'Algo salio mal'

        })

    }

}

module.exports= {login}