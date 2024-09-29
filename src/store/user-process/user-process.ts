import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { UserProcess } from '../../types/state.ts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { UserData } from '../../types/user-data.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    loadUserData: (state, action: PayloadAction<{user: UserData}>) => {
      const { user } = action.payload;
      state.user = user;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
