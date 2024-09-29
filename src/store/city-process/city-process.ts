import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, NameSpace } from '../../const';
import { CityProcess } from '../../types/state';
import { City } from '../../types/offers';

const initialState: CityProcess = {
  city: Cities.PARIS
};

export const cityProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity } = cityProcess.actions;
