import { combineReducers } from '@reduxjs/toolkit';
import photos from './photosSlice';

const reducer = combineReducers({
	photos
});
export default reducer;
