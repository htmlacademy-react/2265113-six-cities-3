import cn from 'classnames';
import { Card } from '../card/card';
import { Offer } from '../../types/offers';
import { CardType } from '../../const';

type OfferListProps = {
  offers: Offer[];
  cardType: number;
}

export const OfferList = ({ offers, cardType }: OfferListProps) => (
  <div className={cn(
    'places__list',
    {'cities__places-list': cardType === CardType.MAIN},
    {'tabs__content': cardType === CardType.MAIN},
    {'near-places__list': cardType === CardType.NEAR}
  )}
  >
    {offers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        cardType={cardType}
      />
    ))}
  </div>
);
