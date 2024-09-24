import { FavoritesList } from '../favorites-list/favorites-list';
import { Offer, OnOfferClickHandlerProps } from '../../types/offers';

type GroupedOffersProps = {
  groupedOffers: Record<string, Offer[]>;
  onOfferClickHandler: OnOfferClickHandlerProps;
}

export const GroupedOffers = ({ groupedOffers, onOfferClickHandler }: GroupedOffersProps) => (
  <ul className="favorites__list">
    {Object.entries(groupedOffers).map(([city, offers]) => (
      <FavoritesList key={city} city={city} offers={offers} onOfferClickHandler={onOfferClickHandler} />
    ))}
  </ul>
);
