import { postPost } from '@/app/api/postAdaptor';
import { AppThunk } from '@/app/store/store';
import { setParent, setContent, openInputForm } from '../reducers/slices/uiSliceReducer';
import { useSelector } from 'react-redux';
import { selectContent, selectParent } from '../selectors/uiSelectors';
import { get } from 'http';

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

export const sendPost = (): AppThunk => (dispatch, getState) => {
  const { parent, content } = getState().ui;
  const inputData = { content };
  if (parent) {
    Object.assign(inputData, { parent });
  }
  postPost(inputData).then((response) => {
    console.log('Post sent:', response);
    // dispatch(setPost(response.data));
  }).catch((error) => {
    console.error('Error sending post:', error);
  });
}