const path=require("path")

require("dotenv").config({path: path.resolve(__dirname, `../../../config/${process.env.NODE_ENV}.env`)});


const convertController = require('../../adapters/controllers/ConvertController')
const authController = require('../../adapters/controllers/AuthController')
const authTesteController = require('../../adapters/controllers/AuthTesteController')
const AuthService = require('../../adapters/providers/authService')
const authService = new AuthService();


const express = require('express')
const cors = require('cors');

const app = express()


//app.use(cors());

// Configurar o middleware de CORS com opções específicas
//app.use(cors({
//  origin: 'http://localhost:4200', // Permite apenas solicitações dessa origem
//  methods: ['GET', 'POST'], // Permite apenas os métodos HTTP GET e POST
//  allowedHeaders: ['Content-Type', 'Authorization'], // Permite apenas esses cabeçalhos personalizados
//}));

try {


const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());

//Validações nas controllers
app.use(authService.validateToken)

//Definição das Controllers
app.use('/api', convertController);
app.use('/api/auth', authController);
app.use('/api/auth/teste', authTesteController);


app.listen(process.env.PORT, () => {
  console.log(`Executando em ${process.env.BASEURL}:${process.env.PORT}`)
});

} catch (err) {
  console.error(err);
}

//function withAuthValidation(controller) {
//  return (req, res, next) => {
//    authService.validateToken(req, res, () => {
//      controller(req, res, next);
//    });
//  };
//}


module.exports = app