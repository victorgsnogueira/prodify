import React, { useState } from 'react';
import { LuArrowUp } from 'react-icons/lu';

const MessageInput: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    console.log('🎯 Iniciando conversão de texto:', text);

    try {
      const response = await fetch('http://localhost:3000/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
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
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
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