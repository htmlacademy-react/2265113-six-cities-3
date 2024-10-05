import cn from 'classnames';
import { Card } from '../card/card';
import { Offer } from '../../types/offers';
import { CardType } from '../../const';

type OfferListProps = {
  offers: Offer[];
  cardType: number;
}

export const OfferList = ({ offers, cardType }: OfferListProps) => {
  const listClassMap = {
    [CardType.MAIN]: 'cities__places-list tabs__content',
    [CardType.NEAR]: 'near-places__list'
  };

  return (
    <div className={cn('places__list', listClassMap[cardType])}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
        />
      ))}
    </div>
  );
};
