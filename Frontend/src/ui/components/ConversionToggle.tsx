import React from 'react';
import { LuArrowRightLeft } from 'react-icons/lu';

interface ConversionToggleProps {
    isTextToAudio: boolean;
    toggleConversion: () => void;
}

const ConversionToggle: React.FC<ConversionToggleProps> = ({ isTextToAudio, toggleConversion }) => {
    return (
        <div className="flex bg-[#171717] items-center space-x-2 mb-6 p-2 rounded-full">
            <div className='w-12'>
                <p className="text-white font-semibold text-lg">
                    {isTextToAudio ? 'Texto' : 'Audio'}
                </p>
            </div>
            <button
                onClick={toggleConversion}
                className="text-[#171717] hover:text-[#222222] transition duration-200"
            >
                <LuArrowRightLeft size={24} className="text-[#080808] hover:text-[#222222]" />
            </button>
            <div className='w-12'>
                <p className="text-white font-semibold text-lg">
                    {isTextToAudio ? 'Audio' : 'Texto'}
                </p>
            </div>
        </div>
    );
};

export default ConversionToggle;