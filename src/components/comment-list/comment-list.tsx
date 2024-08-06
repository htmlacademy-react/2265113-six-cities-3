import { CommentItem } from '../comment-item/comment-item';
import { comments } from '../../mocks/comments';
import { COMMENTS_COUNT } from '../../const';

export const CommentList = () => {
  const sortedComments = comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const limitedComments = sortedComments.slice(0, COMMENTS_COUNT);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{limitedComments.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
};
