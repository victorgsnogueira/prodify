const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');

require('dotenv').config();

const app = express();

// Definir as origens permitidas para CORS
const corsOptions = {
  origin: ['http://localhost:3003', 'https://prodify-ruddy.vercel.app'], // Permitir apenas origens específicas
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Permitir envio de cookies, se necessário
  preflightContinue: false, // Não permitir que o CORS faça redirecionamento
  optionsSuccessStatus: 204, // Definir código de sucesso para as requisições OPTIONS
};

// Aplicando o middleware de CORS
app.use(cors(corsOptions));

// Aumentar o limite do body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
