import React, { useState } from 'react';
import ConversionToggle from '../components/ConversionToggle';
import MessageInput from '../components/MessageInput';
import SpeechInput from '../components/SpeechInput';

const TextSpeechView: React.FC = () => {
  const [isTextToAudio, setIsTextToAudio] = useState(true);

  const toggleConversion = () => {
    setIsTextToAudio((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center justify-between m-4 w-full bg-[#212121] rounded-xl">
      {/* ConversionToggle Centralizado no Topo */}
      <div className="absolute top-4 flex justify-center p-2">
        <ConversionToggle isTextToAudio={isTextToAudio} toggleConversion={toggleConversion} />
      </div>

      <div className="absolute bottom-4 w-full flex justify-center p-2">
        {isTextToAudio ? (
          <MessageInput />
        ) : (
          <SpeechInput />
        )}
      </div>
    </div>
  );
};

export default TextSpeechView;
