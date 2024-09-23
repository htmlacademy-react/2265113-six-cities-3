import { useAppSelector } from '../../hooks';
import { selectComments } from '../../store/selectors';
import { CommentItem } from '../comment-item/comment-item';
import { COMMENTS_COUNT, MIN_COMMENTS_COUNT } from '../../const';

export const CommentList = () => {
  const comments = useAppSelector(selectComments);

  const sortedComments = [...comments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const limitedComments = sortedComments.slice(MIN_COMMENTS_COUNT, COMMENTS_COUNT);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
};
