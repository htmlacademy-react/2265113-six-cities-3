import {useState} from 'react';
import { Card } from '../card/card';
import { Offer } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
}

export const OfferList = ({ offers }: OfferListProps) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
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
};
