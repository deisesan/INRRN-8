const jwt = require('jsonwebtoken');
const {promisify} = require('util');
require('dotenv').config();

module.exports = {
    eAdmin: async function validarToken (req, res, next){
        const authHeader = req.headers.authorization;
        const [, token] = authHeader.split(' ');
    
        if(!token){
            return res.json({
                erro: true,
                message: "Error: Necessário realizar Login para acessar a Página!"
            });
        }
    
        try{
            const decode = await promisify(jwt.verify)(token, process.env.SECRET);
            
            req.userId = jwt.decode.id;
    
            return next();
    
        } catch(erro) {
            
            return res.json({
                erro: true,
                message: "Error: Login ou Senha Inválido!"
            });
    
        }
    
    }

}