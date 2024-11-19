const { speechClient } = require('../config/google-cloud');

const speechToText = async (audioContent) => {
  try {
    // Verificar se o conteúdo de áudio está presente
    if (!audioContent) {
      throw new Error('Nenhum conteúdo de áudio fornecido');
    }

    const request = {
      audio: {
        content: audioContent,
      },
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'pt-BR',
        audioChannelCount: 1,
        enableAutomaticPunctuation: true,
      },
    };

    console.log('Iniciando reconhecimento de fala'); // Log de debug
    console.log('Tamanho do conteúdo de áudio:', audioContent.length);
    
    const [response] = await speechClient.recognize(request);
    
    console.log('Resposta do Google Speech:', JSON.stringify(response, null, 2));

    if (response.results && response.results.length > 0) {
      const transcript = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      
      console.log('Transcrição:', transcript);
      
      return transcript;
    } else {
      console.log('Nenhum texto transcrito'); 
      return '';
    }
  } catch (error) {
    console.error('Erro detalhado no Google Speech-to-Text:', error);
    throw error;
  }
};

module.exports = { speechToText };