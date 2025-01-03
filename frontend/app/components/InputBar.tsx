import React, { useState } from 'react';
import { postPost } from '../api/postAdaptor';
interface InputBarProps {
  parent: string;
}


const InputBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [parent, setParent] = useState<string>(''); // Parent thread id

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    // send post => view personal page or single post page?
    // send comment => view latest thread page

    if (inputValue.trim()) {
      postPost(inputValue).then((response) => {
        console.log('Post sent:', response);
      }).catch((error) => {
        console.error('Error sending post:', error);
      });
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center pt-2 bg-white">
      <input
        type="text"
        className="flex-grow text-left px-3 py-2 outline-none text-gray-700 border border-gray-300 rounded-full"
        placeholder="What's new?"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="ml-2 p-2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        onClick={handleSend}
        aria-label="Send"
      >
        <i className="lni lni-location-arrow-right lni-lg"></i>
      </button>
    </div>
  );
};

export default InputBar;