import React from 'react';
import { LuArrowUp } from 'react-icons/lu';

const MessageInput: React.FC = () => {
  return (
    <div className="flex w-full items-center bg-[#171717] rounded-full shadow-md">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        className="flex-1 ml-2 bg-transparent text-white placeholder-[#b4b4b4] p-2 outline-none"
      />
      <button className="p-2 mr-2 text-white hover:text-[#8e94f2] transition duration-300">
        <div className='p-2 bg-[#676767] rounded-full'><LuArrowUp size={18} color='black' /></div>
      </button>
    </div>
  );
};

export default MessageInput;