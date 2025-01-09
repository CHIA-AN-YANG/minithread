import React, { useState } from 'react';
import { endInput, sendThread, updateContent } from '../../store/features/user/actions/threadActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectInputFormOpen } from '../../store/features/user/selectors/uiSelectors';
import { AppDispatch } from '../../store/store';



const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const uiState = useSelector(selectInputFormOpen);

  const handleCloseForm = () => {
    dispatch(endInput());
  };

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
      dispatch(sendThread());
      dispatch(endInput());
    }
  };

  return (

    (uiState === 'open') && <>
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-10" onClick={handleCloseForm}></div>
      <div className="absolute bottom-0 left-0 flex p-4 w-full items-start bg-white">
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
    </>
  );
};

export default InputForm;
