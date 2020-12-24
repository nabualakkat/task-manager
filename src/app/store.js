import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/index';

export default configureStore({
  reducer: rootReducer
});
