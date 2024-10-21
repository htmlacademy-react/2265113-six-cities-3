import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { Offer, CurrentOffer } from '../types/offers';
import { Comment, CommentToSend } from '../types/comments';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/FetchOffers',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'userProcess/checkAuth',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'userProcess/Login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'userProcess/Logout',
  async (_arg, {extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch {
      toast.warn('Failed to Logout');
    }
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<CurrentOffer, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/fetchCurrentOffer',
  async ({id}, {extra: api}) => {
    const { data } = await api.get<CurrentOffer>(`${APIRoute.Offers}/${id}`);

    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Comment[], Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'commentsData/fetchComments',
  async ({id}, {extra: api}) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const postCommentAction = createAsyncThunk<Comment | void, CommentToSend, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'commentsData/postComment',
  async ({comment, rating, id}, {extra: api}) => {
    try {
      const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});

      return data;
    } catch {
      toast.warn('Failed to post comments');
    }
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);

    return data;
  }
);

export const fetchNearestOfferAction = createAsyncThunk<Offer[], Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/fetchNearestOffers',
  async ({id}, {extra: api}) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);

    return data;
  }
);

export const updateOfferFavoriteStatusAction = createAsyncThunk<Offer[], {id: string; favoriteStatus: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/updateOfferFavoriteStatus',
  async ({id, favoriteStatus}, {extra: api}) => {
    const status = favoriteStatus ? 0 : 1;
    await api.post(`${APIRoute.Favorite}/${id}/${status}`);
    const { data } = await api.get<Offer[]>(APIRoute.Offers);

    return data;
  }
);
