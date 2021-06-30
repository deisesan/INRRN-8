const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const {promisify} = require('util');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get('/usuarios', validarToken, function (req, res) {

    return res.json({
        erro: false, 
        message: "Listar Usuários!",
        //dados: req.body
    });

})

app.post('/login', function (req, res) {
    
    if (req.body.usuario === 'deise@email.com' && req.body.senha === '123456'){
        
        const {id} = 1;
        var privateKey = process.env.SECRET;
        var token = jwt.sign({id}, privateKey, {
            //expiresIn: 600 //10min
            expiresIn: '7d' //7dias
        });

        return res.json({
            erro: false,
            message: "Login Realizado com Sucesso!",
            token
        });

    }

    return res.json({
        erro: true, 
        message: "Login Incorreto!"
    });

})

//Verificação do Token
async function validarToken (req, res, next){
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

app.listen(8080, function(){
        console.log("Servidor Iniciado na Porta 8080: http://localhost:8080/");
});