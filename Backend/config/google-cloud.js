const fs = require('fs'); // Para ler o arquivo JSON
const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

require('dotenv').config();

const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);

const speechClient = new SpeechClient({ credentials });
const textToSpeechClient = new TextToSpeechClient({ credentials });

module.exports = { speechClient, textToSpeechClient };