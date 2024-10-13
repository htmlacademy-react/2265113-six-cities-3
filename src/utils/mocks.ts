import { datatype, internet, name } from 'faker';
import { Offer } from '../types/offers';
import { Cities } from '../const';
import { CommentsData } from '../types/state';
import { UserData } from '../types/user-data';

export const makeFakeOffer = (): Offer => ({
  id: name.title(),
  title: name.title(),
  type: name.title(),
  price: datatype.number(),
  previewImage: internet.avatar(),
  city: Object.values(Cities)[Math.floor(Math.random() * Object.entries(Cities).length)],
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  isFavorite: datatype.number() > datatype.number(),
  isPremium: datatype.number() < datatype.number(),
  rating: datatype.number(),
});

export const makeFakeOffers = (): Offer[] => new Array(3).fill(null).map(() => makeFakeOffer());

export const makeFakeUser = (): UserData => ({
  email: internet.email(),
  token: name.title(),
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: datatype.number() > datatype.number()
});

export const makeFakeComments = (): CommentsData => ({
  comments: new Array(3).fill(null).map(() => ({
    id: name.title(),
    comment: name.title(),
    date: datatype.string(),
    rating: datatype.number(),
    user: makeFakeUser()
  }))
});
