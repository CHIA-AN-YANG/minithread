import React, { use, useEffect, useState } from 'react';
import { postPost } from '../api/postAdaptor';
import { endInput, sendPost, updateContent } from '../store/features/user/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectInputFormOpen } from '../store/features/user/selectors/uiSelectors';
import { AppDispatch, store } from '../store/store';



const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const uiState = useSelector(selectInputFormOpen);

  const handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
    setInputValue(e.target.value);
    dispatch(updateContent(e.target.value));
  };

  const handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (uiState === 'open' && inputValue.trim()) {
      dispatch(updateContent(inputValue));
      dispatch(sendPost());
      dispatch(endInput());
    }
  };

  return (

    (uiState === 'open') && <div className="absolute bottom-0 left-0 flex p-4 w-full items-start bg-white">
      <textarea
        className="flex-grow text-left text-top p-2 h-20 outline-none text-gray-700 border border-gray-300 rounded-md"
        placeholder="What's new?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
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

export default InputForm;
