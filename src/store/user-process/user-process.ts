import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { UserProcess } from '../../types/state.ts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { UserData } from '../../types/user-data.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const setUserAndAuthorization = (state: UserProcess, user: UserData | null, status: AuthorizationStatus) => {
  state.user = user;
  state.authorizationStatus = status;
};

const handleAuthRejected = (state: UserProcess) => {
  state.authorizationStatus = AuthorizationStatus.NoAuth;
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    loadUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, handleAuthRejected)
      .addCase(loginAction.fulfilled, (state, action) => {
        setUserAndAuthorization(state, action.payload, AuthorizationStatus.Auth);
      })
      .addCase(loginAction.rejected, handleAuthRejected)
      .addCase(logoutAction.fulfilled, (state) => {
        setUserAndAuthorization(state, null, AuthorizationStatus.NoAuth);
      });
  }
});

export const { loadUserData } = userProcess.actions;
