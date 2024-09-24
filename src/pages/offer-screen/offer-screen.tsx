import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../components/header/header';
import { Offer, OnOfferClickHandlerProps } from '../../types/offers';
import { CommentForm } from '../../components/comment-form/comment-form';
import { CommentList } from '../../components/comment-list/comment-list';
import { PlaceCardRating } from '../../components/card/place-card-rating';
import { OfferList } from '../../components/offer-list/offer-list';
import { Map } from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { selectCurrentOffer, selectAuthorizationStatus, selectNearestOffers } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';

const status = true;
const MIN_IMAGES = 0;
const MAX_IMAGES = 6;

type OfferProps = {
  offers: Offer[];
  onOfferClickHandler: OnOfferClickHandlerProps;
}

export const OfferScreen = ({offers, onOfferClickHandler}: OfferProps): JSX.Element => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const { id } = useParams();
  const currentOffer = useAppSelector(selectCurrentOffer);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const nearestOffers = useAppSelector(selectNearestOffers).slice(0, 3);

  if (!currentOffer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. Предложение</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(MIN_IMAGES, MAX_IMAGES).map((image) => (
                <div className="offer__image-wrapper" key={id + image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <PlaceCardRating rating={currentOffer.rating} status={status} />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms > 1 ? `${currentOffer.bedrooms} Bedrooms` : `${currentOffer.bedrooms} Bedroom`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={id + good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro
                    ? (
                      <span className="offer__user-status">
                          Pro
                      </span>
                    )
                    : ''}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <CommentList />
                {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm /> : ''}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={currentOffer.city}
              points={nearestOffers}
              selectedOffer={offers.find((offer) => offer.id === activeOfferId)}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offers={nearestOffers} activeOfferId={activeOfferId} setActiveOfferId={setActiveOfferId} onOfferClickHandler={onOfferClickHandler} isNear />
          </section>
        </div>
      </main>
    </div>
  );
};
