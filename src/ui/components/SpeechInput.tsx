import React from 'react';
import { LuMic } from 'react-icons/lu';

const SpeechInput: React.FC = () => {
    return (
        <button className="bg-[#8e94f2] hover:bg-[#9fa0ff] p-4 rounded-full">
            <LuMic size={32} className="text-white" />
        </button>
    );
};

export default SpeechInput;