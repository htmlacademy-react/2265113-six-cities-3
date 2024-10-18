import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { AppThunkDispatch, extractActionsTypes, makeFakeComments, makeFakeCurrentOffer, makeFakeOffer, makeFakeOffers } from '../tests/mocks';
import { APIRoute } from '../const';
import { checkAuthAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearestOfferAction, fetchOffersAction, loginAction, logoutAction, postCommentAction, updateOfferFavoriteStatusAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] }});
  });

  describe('updateOfferFavoriteStatusAction', () => {
    it('should dispatch "updateOfferFavoriteStatusAction.pending", "updateOfferFavoriteStatusAction.rejected", when server response 214', async() => {
      const mockOffer = makeFakeOffer();
      const mockId = mockOffer.id;
      const status = mockOffer.isFavorite ? 0 : 1;
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockId}/${status}`).reply(214, mockOffer);

      await store.dispatch(updateOfferFavoriteStatusAction({id: mockId, favoriteStatus: mockOffer.isFavorite}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        updateOfferFavoriteStatusAction.pending.type,
        updateOfferFavoriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffers()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: 'test1' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchCurrentOfferAction', () => {
    it('should dispatch "fetchCurrentOfferAction.pending", "fetchCurrentOfferAction.fulfilled", when server response 200', async() => {
      const mockCurrentOffer = makeFakeCurrentOffer();
      const mockId = mockCurrentOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}`).reply(200, mockCurrentOffer);

      await store.dispatch(fetchCurrentOfferAction(mockCurrentOffer));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCurrentOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCurrentOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCurrentOfferAction.pending.type,
        fetchCurrentOfferAction.fulfilled.type,
      ]);

      expect(fetchCurrentOfferActionFulfilled.payload)
        .toEqual(mockCurrentOffer);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.fulfilled", when server response 200', async() => {
      const mockComments = makeFakeComments();
      const mockCurrentOffer = makeFakeCurrentOffer();
      const mockId = mockCurrentOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockId}`).reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(mockCurrentOffer));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload)
        .toEqual(mockComments);
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch "postCommentAction.pending", "postCommentAction.fulfilled", when server response 200', async() => {
      const mockComments = makeFakeComments();
      const mockCurrentOffer = makeFakeCurrentOffer();
      const mockId = mockCurrentOffer.id;
      const rating = 3;
      const comment = '123';
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockId}`).reply(200, mockComments);

      await store.dispatch(postCommentAction({comment, rating, id: mockId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postCommentActionFulfilled = emittedActions.at(1) as ReturnType<typeof postCommentAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);

      expect(postCommentActionFulfilled.payload)
        .toEqual(mockComments);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffers()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoriteOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });
  });

  describe('fetchNearestOfferAction', () => {
    it('should dispatch "fetchNearestOfferAction.pending", "fetchNearestOfferAction.fulfilled", when server response 200', async() => {
      const mockNearestOffers = makeFakeOffers();
      const mockCurrentOffer = makeFakeCurrentOffer();
      const mockId = mockCurrentOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}/nearby`).reply(200, mockNearestOffers);

      await store.dispatch(fetchNearestOfferAction(mockCurrentOffer));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearestOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearestOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearestOfferAction.pending.type,
        fetchNearestOfferAction.fulfilled.type,
      ]);

      expect(fetchNearestOfferActionFulfilled.payload)
        .toEqual(mockNearestOffers);
    });
  });
});
