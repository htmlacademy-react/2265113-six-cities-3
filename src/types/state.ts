import {store} from '../store/index';
import { Comment } from './comments.js';
import { City, CurrentOffer, Offer } from './offers.js';
import { UserData } from './user-data.js';
import { AuthorizationStatus } from '../const.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type OffersData = {
  offers: Offer[];
  favoriteOffers: Offer[];
  currentOffer: CurrentOffer | null;
  nearestOffers: Offer[];
  isOffersDataLoading: boolean;
  sortOffers: string;
};

export type CommentsData = {
  comments: Comment[];
};

export type SortProcess = {
  isFiltersOpen: boolean;
};

export type CityProcess = {
  city: City;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
