import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { FavoriteCard } from '../favorite-card/favorite-card';

export const FavoritesList = ({ city, offers }: { city: string; offers: Offer[] }) => (
  <li className="favorites__locations-items" key={city}>
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to="/">
          <span>{city}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      {offers.map((offer) => (
        <FavoriteCard key={offer.id} offer={offer} />
      ))}
    </div>
  </li>
);
