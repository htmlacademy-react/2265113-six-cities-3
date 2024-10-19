import { FavoritesList } from '../favorites-list/favorites-list';
import { Offer } from '../../types/offers';

type GroupedOffersProps = {
  groupedOffers: Record<string, Offer[]>;
}

export const GroupedOffers = ({ groupedOffers }: GroupedOffersProps) => (
  <ul className="favorites__list" data-testid='groupedOffers'>
    {Object.entries(groupedOffers).map(([city, offers]) => (
      <FavoritesList key={city} city={city} offers={offers} />
    ))}
  </ul>
);
