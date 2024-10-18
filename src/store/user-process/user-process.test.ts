import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { loadUserData, userProcess } from './user-process';
import { makeFakeUser } from '../../tests/mocks';

describe('UserProcess Slice', () => {
  const mockUser = makeFakeUser();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null
    };

    const result = userProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set user with "loadUserData" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };

    const result = userProcess.reducer(initialState, loadUserData(mockUser));

    expect(result.user).toEqual(mockUser);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };
    const expectedAuthorizationStatus = AuthorizationStatus.Auth;
    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(mockUser, '', undefined));

    expect(result.authorizationStatus).toEqual(expectedAuthorizationStatus);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null
    };
    const expectedAuthorizationStatus = AuthorizationStatus.NoAuth;

    const result = userProcess.reducer(initialState, checkAuthAction.rejected(null, '', undefined));

    expect(result.authorizationStatus).toEqual(expectedAuthorizationStatus);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser
    };

    const result = userProcess.reducer(initialState, loginAction.fulfilled(mockUser, '', {email: 'test@test.ru', password: 'test1'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
