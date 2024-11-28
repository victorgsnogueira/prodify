const { textToSpeechClient } = require('../config/google-cloud');

const textToSpeech = async (text, language) => {
    try {
      const voiceConfig = LANGUAGE_VOICES[language];
      if (!voiceConfig) {
        throw new Error(`Unsupported language: ${language}`);
      }
  
      const request = {
        input: { text },
        voice: {
          languageCode: voiceConfig.languageCode,
          name: voiceConfig.name,
          ssmlGender: voiceConfig.ssmlGender,
        },
        audioConfig: { audioEncoding: 'MP3' },  
      };
  
      const [response] = await textToSpeechClient.synthesizeSpeech(request);
      return response.audioContent;
  
    } catch (error) {
      console.error('ERROR:', error);
      throw new Error('Failed to convert text to speech');
    }
  };

module.exports = { textToSpeech };
