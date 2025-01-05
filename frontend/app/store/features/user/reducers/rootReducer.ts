import { combineReducers } from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSliceReducer';
import uiSliceReducer from './slices/uiSliceReducer';

const rootReducer = combineReducers({
  ui: uiSliceReducer.reducer,
  auth: authSliceReducer.reducer,
});

export default rootReducer;