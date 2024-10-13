import { AuthorizationStatus, NameSpace } from '../../const';
import { selectAuthorizationStatus, selectUserData } from './selectors';

describe('UserProcess selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null
    }
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = selectAuthorizationStatus(state);

    expect(result).toBe(authorizationStatus);
  });

  it('should return user from state', () => {
    const { user } = state[NameSpace.User];
    const result = selectUserData(state);

    expect(result).toBe(user);
  });
});
