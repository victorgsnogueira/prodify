const { textToSpeechClient } = require('../config/google-cloud');

const textToSpeech = async (text) => {
    const request = {
        input: { text },
        voice: {
            languageCode: 'pt-BR',
            name: 'pt-BR-Wavenet-C',
            ssmlGender: 'female',
        },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [response] = await textToSpeechClient.synthesizeSpeech(request);
        return response.audioContent;
    } catch (error) {
        console.error('ERROR:', error);
        throw new Error('Failed to convert text to speech');
    }
};

module.exports = { textToSpeech };
