import { FavoritesList } from '../favorites-list/favorites-list';
import { Offer } from '../../types/offers';

type GroupedOffersProps = {
  groupedOffers: Record<string, Offer[]>;
  onOfferClickHandler: (offer: Offer) => void;
}

export const GroupedOffers = ({ groupedOffers, onOfferClickHandler }: GroupedOffersProps) => (
  <ul className="favorites__list">
    {Object.entries(groupedOffers).map(([city, offers]) => (
      <FavoritesList key={city} city={city} offers={offers} onOfferClickHandler={onOfferClickHandler} />
    ))}
  </ul>
);
