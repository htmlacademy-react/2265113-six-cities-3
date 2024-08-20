import { Card } from '../card/card';
import { Offer } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  activeOfferId: string | null;
  setActiveOfferId: (selectedId: string | null) => void;
}

export const OfferList = ({ offers, activeOfferId, setActiveOfferId }: OfferListProps) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        onSelect={setActiveOfferId}
        isActive={activeOfferId === offer.id}
      />
    ))}
  </div>
);
