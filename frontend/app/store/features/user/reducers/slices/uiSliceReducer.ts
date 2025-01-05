import { UiState } from '@/app/model/model';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UiState = {
  inputForm: 'closed',
  parent: null,
  content: ''
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openInputForm: (state, action) => {
      state.inputForm = action.payload;;
    },
    setParent: (state, action) => {
      state.parent = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    }
  },
});

export const { openInputForm, setParent, setContent } = uiSlice.actions;

export default uiSlice;