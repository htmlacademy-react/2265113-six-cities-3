import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { selectCurrentOffer } from '../../store/offer-data/selectors';
import { CommentToSend } from '../../types/comments';
import { AppRoute, CommentLength } from '../../const';
import { fetchCommentsAction } from '../../store/api-actions';

export const CommentForm = () => {
  const currentOffer = useAppSelector(selectCurrentOffer);
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
    id: currentOffer?.id
  } as CommentToSend);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isDisabled = formData.rating === 0 || formData.comment.length < CommentLength.MIN_LENGTH || formData.comment.length > CommentLength.MAX_LENGTH;

  const inputStarsCountChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    if (currentOffer) {
      setFormData({
        ...formData,
        rating: value
      });
    }
  };

  const textareaChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.target;
    if (currentOffer) {
      setFormData({
        ...formData,
        comment: value
      });
    }
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction(formData));

    if (!currentOffer) {
      return;
    }

    dispatch(fetchCommentsAction(currentOffer));
    navigate(`${AppRoute.Offer}${currentOffer.id}`);
    setFormData({
      ...formData,
      comment: '',
      rating: 0
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={inputStarsCountChangeHandler}
              checked={formData.rating === value}
              key={`input-${value}`}
              data-testid={`formRating-${value}`}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - value]}
              key={`label-${value}`}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={textareaChangeHandler}
        minLength={CommentLength.MIN_LENGTH}
        maxLength={CommentLength.MAX_LENGTH}
        data-testid='formComment'
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
