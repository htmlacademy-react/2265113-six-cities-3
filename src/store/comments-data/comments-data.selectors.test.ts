import { datatype, name } from 'faker';
import { NameSpace } from '../../const';
import { makeFakeUser } from '../../utils/mocks';
import { selectComments } from './selectors';

describe('CommentsData selectors', () => {
  const mockComments = {
    id: name.title(),
    comment: name.title(),
    date: datatype.string(),
    rating: datatype.number(),
    user: makeFakeUser()
  };
  const state = {
    [NameSpace.Comments]: {
      comments: [mockComments]
    }
  };

  it('should return comments from state', () => {
    const { comments } = state[NameSpace.Comments];
    const result = selectComments(state);

    expect(result).toBe(comments);
  });
});
