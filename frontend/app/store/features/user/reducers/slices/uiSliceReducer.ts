import { ContentStatus, EntityStatus, UiState } from '@/app/model/model';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UiState = {
  inputForm: 'closed',
  parent: null,
  content: '',
  status: ContentStatus.IDLE,
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
    },
    setUiStatusSent: (state) => {
      state.status = ContentStatus.SENT;
    },
    setUiStatusDeleted: (state) => {
      state.status = ContentStatus.DELETED;
    },
    setUiStatusError: (state) => {
      state.status = ContentStatus.ERROR;
    },
    setUiStatusLoading: (state) => {
      state.status = ContentStatus.LOADING;
    },
    setUiStatusIdle: (state) => {
      state.status = ContentStatus.IDLE;
    },
  },
});

export const { openInputForm, setParent, setContent, setUiStatusSent, setUiStatusDeleted, setUiStatusError, setUiStatusIdle, setUiStatusLoading } = uiSlice.actions;

export default uiSlice;