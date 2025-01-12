
import { AppThunk } from '@/app/store/store';
import { setParent, setContent, openInputForm, setUiStatusError, setUiStatusSent } from '../reducers/slices/uiSliceReducer';
import { postThread } from '@/app/api/threadAdaptor';

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