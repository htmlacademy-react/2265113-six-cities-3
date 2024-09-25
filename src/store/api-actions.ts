import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { loadOffers, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute, loadUserData, loadCurrentOffer, loadComments, loadFavoriteOffers, loadNearestOffers } from './action';
import { Offer, CurrentOffer } from '../types/offers';
import { Comment, CommentToSend } from '../types/comments';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch {
      toast.warn('Failed to fetch offers');
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHECK_AUTH',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserData(data));

      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOGIN',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
      dispatch(loadUserData(data));
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      toast.warn('Failed to Login');
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch {
      toast.warn('Failed to Logout');
    }
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_CURRENT_OFFER',
  async ({id}, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const { data } = await api.get<CurrentOffer>(`${APIRoute.Offers}/${id}`);
      dispatch(loadCurrentOffer(data));
    } catch {
      toast.warn('Failed to fetch current offer');
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const fetchCommentsAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_COMMENTS',
  async ({id}, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch {
      toast.warn('Failed to fetch comments');
    }
  }
);

export const postCommentAction = createAsyncThunk<Comment | void, CommentToSend, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'POST_COMMENT',
  async ({comment, rating, id}, {extra: api}) => {
    try {
      await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
    } catch {
      toast.warn('Failed to post comments');
    }
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_FAVORITE_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(loadFavoriteOffers(data));
    } catch {
      toast.warn('Failed to fetch favorite offers');
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const fetchNearestOfferAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_NEAREST_OFFERS',
  async ({id}, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      dispatch(loadNearestOffers(data));
    } catch {
      toast.warn('Failed to fetch nearest offers');
    }
  }
);

export const updateOfferFavoriteStatusAction = createAsyncThunk<void, {id: string; favoriteStatus: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'UPDATE_OFFER_FAVORITE_STATUS',
  async ({id, favoriteStatus}, {extra: api}) => {
    try {
      const status = favoriteStatus ? 0 : 1;
      await api.post(`${APIRoute.Favorite}/${id}/${status}`);
    } catch {
      toast.warn('Failed to update offer favorite status');
    }
  }
);
