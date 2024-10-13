import { NameSpace } from '../../const';
import { makeFakeComments } from '../../utils/mocks';
import { selectComments } from './selectors';

describe('CommentsData selectors', () => {
  const mockComments = makeFakeComments();
  const state = {
    [NameSpace.Comments]: {
      comments: [...mockComments.comments]
    }
  };

  it('should return comments from state', () => {
    const { comments } = state[NameSpace.Comments];
    const result = selectComments(state);

    expect(result).toBe(comments);
  });
});
