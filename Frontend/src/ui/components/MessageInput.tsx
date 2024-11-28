import React, { useState, useEffect } from 'react';
import { LuArrowUp, LuLanguages } from 'react-icons/lu';
import { franc } from 'franc-min';

// Define an interface for the voice configuration
interface VoiceConfig {
  languageCode: string;
  name: string;
  ssmlGender: string;
}

// Define the type for LANGUAGE_VOICES with an index signature
interface LanguageVoices {
  [key: string]: VoiceConfig;
  'auto': VoiceConfig;
  'en-US': VoiceConfig;
  'pt-BR': VoiceConfig;
  'es-ES': VoiceConfig;
  'fr-FR': VoiceConfig;
  'de-DE': VoiceConfig;
  'it-IT': VoiceConfig;
  'ja-JP': VoiceConfig;
  'ko-KR': VoiceConfig;
  'zh-CN': VoiceConfig;
  'ar-XA': VoiceConfig;
  'ru-RU': VoiceConfig;
}

// Cast LANGUAGE_VOICES to the new type
const LANGUAGE_VOICES: LanguageVoices = {
  'auto': { languageCode: 'auto', name: 'auto', ssmlGender: 'neutral' },
  'en-US': { languageCode: 'en-US', name: 'en-US-Wavenet-D', ssmlGender: 'male' },
  'pt-BR': { languageCode: 'pt-BR', name: 'pt-BR-Wavenet-C', ssmlGender: 'female' },
  'es-ES': { languageCode: 'es-ES', name: 'es-ES-Wavenet-B', ssmlGender: 'female' },
  'fr-FR': { languageCode: 'fr-FR', name: 'fr-FR-Wavenet-C', ssmlGender: 'female' },
  'de-DE': { languageCode: 'de-DE', name: 'de-DE-Wavenet-F', ssmlGender: 'female' },
  'it-IT': { languageCode: 'it-IT', name: 'it-IT-Wavenet-D', ssmlGender: 'male' },
  'ja-JP': { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-D', ssmlGender: 'male' },
  'ko-KR': { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-B', ssmlGender: 'female' },
  'zh-CN': { languageCode: 'zh-CN', name: 'zh-CN-Wavenet-D', ssmlGender: 'male' },
  'ar-XA': { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-D', ssmlGender: 'male' },
  'ru-RU': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-C', ssmlGender: 'female' }
};

const MessageInput: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof LanguageVoices>('auto');
  const [detectedLanguage, setDetectedLanguage] = useState<keyof LanguageVoices>('en-US');

  // Language mapping for franc language codes
  const languageMap: { [key: string]: keyof LanguageVoices } = {
    'eng': 'en-US',
    'por': 'pt-BR',
    'spa': 'es-ES',
    'fra': 'fr-FR',
    'deu': 'de-DE',
    'ita': 'it-IT',
    'jpn': 'ja-JP',
    'kor': 'ko-KR',
    'zho': 'zh-CN',
    'ara': 'ar-XA',
    'rus': 'ru-RU'
  };

  // Detect language when text changes
  useEffect(() => {
    if (text.trim()) {
      const langCode = franc(text, { 
        minLength: 3,
        only: Object.keys(LANGUAGE_VOICES).filter(code => code !== 'auto')
      });
      
      const detectedCode = languageMap[langCode] || 'en-US';
      setDetectedLanguage(detectedCode);
    }
  }, [text]);

  // Toggle language selection
  const toggleLanguage = () => {
    const languages = Object.keys(LANGUAGE_VOICES) as Array<keyof LanguageVoices>;
    const currentIndex = languages.indexOf(selectedLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setSelectedLanguage(languages[nextIndex]);
  };

  const handleSubmit = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    console.log('🎯 Iniciando conversão de texto:', text);

    try {
      // Determine final language: 
      // 1. User-selected if not 'auto'
      // 2. Detected language if 'auto' is selected
      const finalLanguage = selectedLanguage === 'auto' 
        ? detectedLanguage 
        : selectedLanguage;

      // Safely access voice config with type checking
      const voiceConfig = LANGUAGE_VOICES[finalLanguage];

      const response = await fetch('https://prodify-ruddy.vercel.app/api/text-to-speech', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          text: text.trim(),
          language: voiceConfig
        }),
      });

      const data = await response.json();
      console.log('✅ Resposta recebida do servidor:', data);

      if (data.success && data.audioContent) {
        console.log('🔊 Criando blob de áudio...');
        const binaryAudio = atob(data.audioContent);
        const arrayBuffer = new ArrayBuffer(binaryAudio.length);
        const view = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryAudio.length; i++) {
          view[i] = binaryAudio.charCodeAt(i);
        }

        const audioBlob = new Blob([arrayBuffer], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
        console.log('✨ Áudio reproduzido com sucesso!');
      } else {
        throw new Error(data.error || 'Erro ao converter texto para áudio');
      }
    } catch (error) {
      console.error('❌ Erro durante a conversão:', error);
    } finally {
      setIsLoading(false);
      setText('');
    }
  };

  return (
    <div className="flex w-full items-center bg-[#171717] rounded-full shadow-md">
      <button 
        onClick={toggleLanguage}
        className="ml-2 text-white hover:text-[#8e94f2] transition duration-300"
      >
        <LuLanguages size={24} />
        <span className="text-xs ml-1">
          {selectedLanguage === 'auto' 
            ? 'Auto' 
            : selectedLanguage
          }
        </span>
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Digite sua mensagem... (Detectado: ${detectedLanguage})`}
        className="flex-1 ml-2 bg-transparent text-white placeholder-[#b4b4b4] p-2 outline-none"
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="p-2 mr-2 text-white hover:text-[#8e94f2] transition duration-300"
      >
        <div className={`p-2 ${isLoading ? 'bg-[#454545]' : 'bg-[#676767]'} rounded-full`}>
          <LuArrowUp size={18} color='black' />
        </div>
      </button>
    </div>
  );
};

export default MessageInput;