
import { postThread } from '@/api/threadAdaptor';
import { AppThunk } from '@/store/store';
import { openInputForm, setContent, setParent, setUiStatusError, setUiStatusSent } from '../reducers/slices/uiSliceReducer';

export const startInput = (postId?: string): AppThunk => (dispatch) => {
  dispatch(setParent(postId ? postId : null));
  dispatch(openInputForm('open'));
}

export const endInput = (): AppThunk => (dispatch) => {
  dispatch(setParent(null));
  dispatch(setContent(''));
  dispatch(openInputForm('closed'));
}

export const updateContent = (content: string): AppThunk => (dispatch) => {
  dispatch(setContent(content));
}

export const sendThread = (): AppThunk => (dispatch, getState) => {
  const { parent, content } = getState().ui;
  const inputData = { content };
  if (parent) {
    Object.assign(inputData, { parent });
  }
  postThread(inputData).then((response) => {
    console.log('Post sent:', response);
    if (response.status == 201) {
      console.log('Post sent with 201');
      dispatch(setUiStatusSent());
    }
  }).catch(() => dispatch(setUiStatusError()))
    .finally(() => dispatch(endInput()));
}