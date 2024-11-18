const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const speechClient = new SpeechClient();
const textToSpeechClient = new TextToSpeechClient();

module.exports = { speechClient, textToSpeechClient };
