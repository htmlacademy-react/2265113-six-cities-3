import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { offerData } from './offer-data/offer-data';
import { commentsData } from './comments-data/comments-data';
import { sortProcess } from './sort-process/sort-process';
import { cityProcess } from './city-process/city-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offerData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.Sort]: sortProcess.reducer,
  [NameSpace.City]: cityProcess.reducer
});
