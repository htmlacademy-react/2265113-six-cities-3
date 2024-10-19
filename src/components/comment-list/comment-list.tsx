import { useAppSelector } from '../../hooks';
import { selectComments } from '../../store/comments-data/selectors';
import { CommentItem } from '../comment-item/comment-item';
import { CommentsCount } from '../../const';

export const CommentList = () => {
  const comments = useAppSelector(selectComments);

  const sortedComments = [...comments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const limitedComments = sortedComments.slice(CommentsCount.MIN_COMMENTS_COUNT, CommentsCount.MAX_COMMENTS_COUNT);
  return (
    <>
      <h2 className="reviews__title" data-testid='commentList'>Reviews &middot;
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
