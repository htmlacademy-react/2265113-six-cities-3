import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { Card } from '../card/card';
import { CardType } from '../../const';

type FavoritesListProps = {
  city: string;
  offers: Offer[];
}


export const FavoritesList = ({ city, offers }: FavoritesListProps) => (
  <li className="favorites__locations-items" key={city} data-testid='favoritesList'>
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to="/">
          <span>{city}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} cardType={CardType.FAVORITES}/>
      ))}
    </div>
  </li>
);
