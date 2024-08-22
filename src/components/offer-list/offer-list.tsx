import cn from 'classnames';
import { Card } from '../card/card';
import { Offer } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  activeOfferId: string | null;
  setActiveOfferId: (selectedId: string | null) => void;
  isNear: boolean;
}

export const OfferList = ({ offers, activeOfferId, setActiveOfferId, isNear }: OfferListProps) => (
  <div className={cn(
    'places__list',
    {'cities__places-list': !isNear},
    {'tabs__content': !isNear},
    {'near-places__list': isNear}
  )}
  >
    {offers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        onSelect={setActiveOfferId}
        isActive={activeOfferId === offer.id}
        isNear={isNear}
      />
    ))}
  </div>
);
