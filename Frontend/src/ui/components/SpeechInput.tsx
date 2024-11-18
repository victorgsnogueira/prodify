import React, { useState, useRef } from 'react';
import { LuMic, LuAlertCircle } from 'react-icons/lu';

interface SpeechInputProps {
  onTranscriptionComplete?: (text: string) => void;
}

const SpeechInput: React.FC<SpeechInputProps> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setError(null);
      console.log('🎤 Solicitando permissão do microfone');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          sampleRate: 48000,
          channelCount: 1
        } 
      });
      
      // Verificar suporte ao codec
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType
      });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        try {
          setIsProcessing(true);
          console.log('🎤 Gravação finalizada, preparando arquivo');
          
          if (chunksRef.current.length === 0) {
            throw new Error('Nenhum áudio foi gravado');
          }

          const audioBlob = new Blob(chunksRef.current, { type: mimeType });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');

          console.log('📤 Enviando áudio para o servidor...');
          const response = await fetch('http://localhost:3000/api/speech-to-text', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Erro no servidor: ${response.status}`);
          }

          const data = await response.json();
          
          if (!data.success || !data.text) {
            throw new Error(data.error || 'Resposta inválida do servidor');
          }

          console.log('✅ Texto extraído com sucesso:', data.text);
          onTranscriptionComplete?.(data.text);
          setError(null);
        } catch (error) {
          console.error('❌ Erro ao processar áudio:', error);
          setError(error instanceof Error ? error.message : 'Erro desconhecido ao processar áudio');
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log('🎙️ Gravação iniciada');
    } catch (error) {
      console.error('❌ Erro ao acessar microfone:', error);
      setError(error instanceof Error ? error.message : 'Erro ao acessar microfone');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsRecording(false);
      console.log('⏹️ Gravação interrompida');
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button 
        onClick={handleClick}
        disabled={isProcessing}
        className={`
          ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[#8e94f2] hover:bg-[#9fa0ff]'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          p-4 rounded-full transition-colors duration-300
        `}
        aria-label={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
      >
        <LuMic size={32} className="text-white" />
      </button>
      
      {isProcessing && (
        <p className="text-sm text-gray-600">Processando áudio...</p>
      )}
      
      {error && (
        <div className="flex items-center gap-2 p-3 mt-2 text-sm bg-red-100 border border-red-300 text-red-600 rounded-md">
          <LuAlertCircle className="flex-shrink-0" size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SpeechInput;