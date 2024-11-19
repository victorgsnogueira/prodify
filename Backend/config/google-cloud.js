const fs = require('fs'); // Para ler o arquivo JSON
const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

// Ler o keyfile.json diretamente
const keyFilePath = './keyfile.json'; // Caminho relativo para o arquivo
const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

// Inicializar os clientes do Google Cloud com as credenciais
const speechClient = new SpeechClient({ credentials });
const textToSpeechClient = new TextToSpeechClient({ credentials });

module.exports = { speechClient, textToSpeechClient };