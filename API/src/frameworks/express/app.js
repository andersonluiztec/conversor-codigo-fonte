const config = require('../../../config')
const convertController = require('../../adapters/controllers/ConvertController')

const express = require('express')
const cors = require('cors');


const app = express()
 
//app.use(cors());

// Configurar o middleware de CORS com opções específicas
app.use(cors({
  origin: 'http://localhost:4200', // Permite apenas solicitações dessa origem
  methods: ['GET', 'POST'], // Permite apenas os métodos HTTP GET e POST
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite apenas esses cabeçalhos personalizados
}));

app.use(express.json());
app.use('/convert', convertController);
 
app.listen(config.port, () => {
  console.log(`Executando em ${config.baseURL}:${config.port}`)
});

module.exports = app