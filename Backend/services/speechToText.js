const { speechClient } = require('../config/google-cloud');

const speechToText = async (audioContent) => {
  const request = {
    audio: {
      content: audioContent,
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 48000,
      languageCode: 'pt-BR',
    },
  };

  try {
    const [response] = await speechClient.recognize(request);
    return response.results.map(result => result.alternatives[0].transcript).join('\n');
  } catch (error) {
    console.error('ERROR:', error);
    throw new Error('Failed to transcribe audio');
  }
};

module.exports = { speechToText };