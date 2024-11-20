import axios from 'axios';

const api = axios.create({
  baseURL: 'http://prodify-ruddy.vercel.app/api'
});

export interface TextToSpeechResponse {
  audioContent: string;
  success: boolean;
  message?: string;
}

export interface SpeechToTextResponse {
  text: string;
  success: boolean;
  message?: string;
}

export const textToSpeechService = async (text: string): Promise<TextToSpeechResponse> => {
  try {
    console.log('📤 Enviando texto para conversão:', text);
    const response = await api.post<TextToSpeechResponse>('/text-to-speech', { text });
    console.log('📥 Resposta do servidor TTS:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro no serviço de text-to-speech:', error);
    return {
      audioContent: '',
      success: false,
      message: 'Erro ao converter texto para áudio'
    };
  }
};

export const speechToTextService = async (audioFile: File): Promise<SpeechToTextResponse> => {
  try {
    console.log('📤 Enviando áudio para conversão:', audioFile.name);
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await api.post<SpeechToTextResponse>('/speech-to-text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('📥 Resposta do servidor STT:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro no serviço de speech-to-text:', error);
    return {
      text: '',
      success: false,
      message: 'Erro ao converter áudio para texto'
    };
  }
};